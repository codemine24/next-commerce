import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

import { Blog } from "@/interfaces/blog";
import { makeImageUrl } from "@/utils/helper";

export const PopularPostCard = ({
  isLast,
  post,
}: {
  isLast: boolean;
  post: Blog;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: 0,
        borderBottom: isLast ? 0 : 1,
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
        borderColor: "divider",
        borderStyle: "dashed",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          variant="rounded"
          src={makeImageUrl(post.thumbnail)}
          sx={{
            width: 80,
            height: 60,
            mr: 2,
            borderRadius: 1,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 500,
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {post.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {post.author.first_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              •
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.created_at}
            </Typography>
          </Stack>

          <Button
            size="small"
            sx={{ fontSize: "0.75rem" }}
            component={Link}
            href={post.slug}
          >
            Read more
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
