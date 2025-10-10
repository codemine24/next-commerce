import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";

import { PREPOSITIONS } from "../../(helpers)/constants/common";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { dateChecker } from "../../(helpers)/utils/date-checker";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";

import { BlogPayload } from "./blog.interface";
import { blogQueryValidationConfig, blogSearchableFields } from "./blog.utils";

// ------------------------------------ CREATE POST ------------------------------------
const createPost = async (user: User, data: BlogPayload) => {
  // Step 1: Generate a slug from the blog title.
  let slug = slugGenerator(data.title);

  // Step 2: Check the database for an existing blog with the same slug.
  const isExist = await prisma.blog.findFirst({
    where: {
      slug,
    },
  });

  // Step 3: If a blog with the same slug already exists, append a timestamp to make it unique.
  if (isExist) {
    slug = `${slug}-${Date.now()}`;
  }

  // Step 4: Create the blog post in the database with the (possibly updated) slug and the author id.
  const result = await prisma.blog.create({
    data: {
      ...data,
      slug,
      author_id: user.id,
    },
  });

  return result;
};

// ------------------------------------ GET POST'S -------------------------------------
const getPosts = async (query: Record<string, any>) => {
  const {
    search_term,
    page,
    limit,
    sort_by,
    sort_order,
    id,
    slug,
    filter_by,
    from_date,
    to_date,
  } = query;

  // Step 1: Validate sort_by and sort_order values using queryValidator
  if (sort_by) queryValidator(blogQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(blogQueryValidationConfig, "sort_order", sort_order);

  // Step 2: Generate pagination and sorting parameters
  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  // Step 3: Initialize conditions array for Prisma filtering
  const andConditions: Prisma.BlogWhereInput[] = [];

  // Step 4: Add condition for specific blog ID if provided
  if (id)
    andConditions.push({
      id,
    });

  // Step 5: Add condition for blog slug if provided
  if (slug)
    andConditions.push({
      slug,
    });

  // Step 6: Handle filter_by (published, draft, featured, unfeatured)
  if (filter_by) {
    switch (filter_by) {
      case "published":
        andConditions.push({
          published: true,
        });
        break;
      case "draft":
        andConditions.push({
          published: false,
        });
        break;
      case "featured":
        andConditions.push({
          featured: true,
        });
        break;
      case "unfeatured":
        andConditions.push({
          featured: false,
        });
        break;
      default:
        break;
    }
  }

  // Step 7: Add search filter for multiple searchable fields
  if (search_term) {
    andConditions.push({
      OR: blogSearchableFields.map((field) => ({
        [field]: {
          contains: search_term,
          mode: "insensitive",
        },
      })),
    });
  }

  // Step 8: Add filtering by creation date range (from_date and to_date)
  if (from_date) {
    const date = dateChecker(from_date, "from_date");
    andConditions.push({
      created_at: {
        gte: date,
      },
    });
  }

  if (to_date) {
    const date = dateChecker(to_date, "to_date");
    andConditions.push({
      created_at: {
        lte: date,
      },
    });
  }

  // Step 9: Combine all filters into a single Prisma "where" condition
  const whereConditons = {
    AND: andConditions,
  };

  // Step 10: Execute queries in parallel to fetch posts and statistics
  const [result, total, published, featured] = await Promise.all([
    prisma.blog.findMany({
      where: whereConditons,
      skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        author: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            contact_number: true,
            avatar: true,
          },
        },
      },
    }),
    // Count total blogs
    prisma.blog.count({ where: whereConditons }),
    // Count total published blogs
    prisma.blog.count({ where: { published: true, ...whereConditons } }),
    // Count total featured blogs
    prisma.blog.count({ where: { featured: true, ...whereConditons } }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      stats: {
        published: published,
        draft: total - published,
        featured: featured,
        unfeatured: total - featured,
      },
    },
    data: result,
  };
};

// ------------------------------------ GET SINGLE POST --------------------------------
const getSinglePost = async (slug: string) => {
  const result = await prisma.blog.findUniqueOrThrow({
    where: {
      slug,
    },
    include: {
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          contact_number: true,
          avatar: true,
        },
      },
    },
  });

  return result;
};

// ------------------------------------ UPDATE POST ------------------------------------
const updatePost = async (slug: string, payload: Record<string, any>) => {
  // Step 1: Load the existing post by slug (throws if not found)
  const post = await prisma.blog.findUniqueOrThrow({
    where: {
      slug,
    },
  });

  // Step 2: If the title changed, generate a new unique slug
  let generatedSlug = post.slug;
  if (payload.title && payload.title !== post.title) {
    const baseSlug = slugGenerator(payload.title);
    let candidate = baseSlug;
    const maxAttempts = 5;
    let attempt = 0;

    while (attempt < maxAttempts) {
      const conflict = await prisma.blog.findFirst({
        where: {
          slug: candidate,
          NOT: { id: post.id },
        },
      });

      if (!conflict) break;

      attempt++;
      candidate = `${baseSlug}-${attempt}`;
    }

    if (attempt === maxAttempts) {
      candidate = `${baseSlug}-${Date.now()}`;
    }

    generatedSlug = candidate;
  }

  // Step 3: Update the post
  const result = await prisma.blog.update({
    where: {
      id: post.id,
    },
    data: {
      ...payload,
      slug: generatedSlug,
    },
  });

  return result;
};

// ------------------------------------ DELETE POST'S ----------------------------------
const deletePosts = async ({ ids }: { ids: string[] }) => {
  // Step 1: Fetch posts that actually exist in the database
  const validPosts = await prisma.blog.findMany({
    where: {
      id: { in: ids },
    },
  });

  // Step 2: Throw an error if none of the provided IDs are valid
  if (validPosts.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid post id found to delete"
    );
  }

  const validIds = validPosts.map((post) => post.id);

  // Step 3: Delete blogs themselves
  await prisma.blog.deleteMany({
    where: {
      id: { in: validIds },
    },
  });

  return null;
};

// ------------------------------------ GET RELATED POST'S -----------------------------
const getRelatedPosts = async (slug: string) => {
  // Step 1: Get the post
  const post = await prisma.blog.findUniqueOrThrow({
    where: {
      slug,
    },
  });

  const keywords = [
    ...new Set(
      post.title
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word && !PREPOSITIONS.has(word))
    ),
  ];

  // Step 2: Find related post by shared tags OR similar title
  const result = await prisma.blog.findMany({
    where: {
      id: { not: post.id },
      published: true,
      OR: [
        {
          tags: {
            hasSome: post.tags,
          },
        },
        {
          OR: keywords.map((word) => ({
            title: {
              contains: word,
              mode: "insensitive",
            },
          })),
        },
      ],
    },
    take: 10,
    include: {
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          contact_number: true,
          avatar: true,
        },
      },
    },
  });

  return result;
};

export const BlogServices = {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePosts,
  getRelatedPosts,
};
