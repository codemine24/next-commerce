import { getPostBySlug, getRelatedPosts } from "@/actions/blog";

import SingleBlog from "../single-blog";

const SingleBlogPage = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const postResponse = await getPostBySlug(params.slug);
  const relatedPostsResponse = await getRelatedPosts(params.slug);

  if (!postResponse.success) {
    return <div>No post found!</div>;
  }

  return (
    <SingleBlog
      post={postResponse.data}
      relatedPosts={relatedPostsResponse?.data}
    />
  );
};

export default SingleBlogPage;
