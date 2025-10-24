import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";
import sharp from "sharp";

import { CONFIG } from "../../(helpers)/config";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import supabase from "../../(helpers)/shared/supabase";
import { dateChecker } from "../../(helpers)/utils/date-checker";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { DeleteFilePayload, UpdateFilePayload } from "./file.interface";
import {
  allowedFileType,
  fileQueryValidationConfig,
  fileSearchableFields,
  prepareTypes,
} from "./file.utils";

// ------------------------------------- UPLOAD FILES ------------------------------------
const uploadFiles = async (data: Record<string, any>, user: User) => {
  const { files } = data;
  if (files.length === 0) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "No file found to upload"
    );
  }

  const uploadedFiles: Prisma.FileCreateManyInput[] = [];

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedFileType.includes(file.type)) {
        continue;
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      const fileName = `${new Date().getTime()}-${file.name.replaceAll(
        " ",
        "-"
      )}`;
      const { data, error } = await supabase.storage
        .from(CONFIG.general_bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });
      if (error) {
        throw new CustomizedError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to upload file"
        );
      }

      if (data?.id) {
        uploadedFiles.push({
          user_id: user.id,
          name: file.name,
          alt_text: file.name,
          type: file.type,
          size: file.size,
          width: metadata.width || 0,
          height: metadata.height || 0,
          path: data.path,
          bucket_id: data.id,
          bucket_name: CONFIG.general_bucket,
        });
      }
    }
  }

  const result = await prisma.file.createMany({
    data: uploadedFiles,
    skipDuplicates: true,
  });

  return {
    uploaded_count: result.count,
    message: `${result.count} file has been uploaded`,
  };
};

// ------------------------------------- GET FILES ---------------------------------------
const getFiles = async (query: Record<string, any>) => {
  const {
    search_term,
    page,
    limit,
    sort_by,
    sort_order,
    fromDate,
    toDate,
    type,
  } = query;

  if (sort_by) queryValidator(fileQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(fileQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.FileWhereInput[] = [
    { bucket_name: CONFIG.general_bucket },
  ];

  if (search_term) {
    andConditions.push({
      OR: fileSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (type) {
    const types = prepareTypes(type);
    andConditions.push({
      type: {
        in: types,
      },
    });
  }

  if (fromDate) {
    const date = dateChecker(fromDate, "from_date");
    andConditions.push({
      created_at: {
        gte: date,
      },
    });
  }

  if (toDate) {
    const date = dateChecker(toDate, "to_date");
    andConditions.push({
      created_at: {
        lte: date,
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.file.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        uploaded_by: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            role: true,
          },
        },
      },
    }),
    prisma.file.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

// ------------------------------------- GET FILE (SINGLE) -------------------------------
const getFile = async (id: string) => {
  const result = await prisma.file.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      uploaded_by: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          role: true,
        },
      },
    },
  });

  return result;
};

// ------------------------------------- UPDATE FILE -------------------------------------
const updateFile = async (id: string, payload: UpdateFilePayload) => {
  const result = await prisma.file.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

// ------------------------------------- DELETE FILES -----------------------------------
const deleteFiles = async (payload: DeleteFilePayload) => {
  const { files_path } = payload;
  const { data, error } = await supabase.storage
    .from(CONFIG.general_bucket)
    .remove(files_path);

  if ((error as any)?.status === 400 || data?.length === 0)
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "No valid file path found to delete"
    );

  const deletedFilesBucketId = data?.map((file) => file.id);

  const result = await prisma.file.deleteMany({
    where: {
      bucket_id: {
        in: deletedFilesBucketId,
      },
    },
  });

  return {
    deleted_count: result.count,
    message: `${result.count} file has been deleted`,
  };
};

export const FileServices = {
  uploadFiles,
  getFiles,
  getFile,
  updateFile,
  deleteFiles,
};
