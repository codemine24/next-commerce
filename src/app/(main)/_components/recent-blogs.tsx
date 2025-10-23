import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { getPosts } from "@/actions/blog";
import { OptimizeImage } from "@/components/optimize-image";
import { Blog } from "@/interfaces/blog";
import { dateFormatter } from "@/utils/date-formatter";
import { makeImageUrl } from "@/utils/helper";

export const RecentBlogs = async () => {
  const getPostsResponse = await getPosts({ limit: 3 });

  return (
    <Box>
      <Grid container spacing={2}>
        {getPostsResponse?.data?.length > 0 && (
          <>
            {getPostsResponse?.data?.map((post: Blog, index: number) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{ border: "1px solid #EFEDFA" }}
              >
                <OptimizeImage
                  src={makeImageUrl(post.thumbnail)}
                  alt="Blog"
                  height={250}
                  imageStyle={{ objectFit: "cover" }}
                />
                <Box py={2.5} pl={2.5}>
                  <Link href={`/blog/${post.slug}`}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ "&:hover": { textDecoration: "underline" } }}
                    >
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    By {post.author.first_name} on{" "}
                    {dateFormatter(post.created_at)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};
