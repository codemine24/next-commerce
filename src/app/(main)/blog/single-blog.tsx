import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";

import { BoxContainer } from "@/components/box-container";
import { AccessTimeIcon } from "@/icons/access-time";
import { AccountCircleIcon } from "@/icons/account-circle";
import { Blog } from "@/interfaces/blog";
import { BORDER_RADIUS } from "@/theme";
import { makeImageUrl } from "@/utils/helper";

import { blogData, socialIcons } from "./blog-data";
import { PopularPostCard } from "./popular-post-card";
import { SectionTitle } from "./section-title";

type Props = {
  post: Blog;
};

const SingleBlog: React.FC<Props> = ({ post }) => {
  const popularPosts = blogData.slice(1, 6);

  return (
    <BoxContainer sx={{ py: 2 }}>
      <Grid container spacing={4} sx={{ position: "relative" }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 2,
              borderRadius: BORDER_RADIUS.default,
            }}
          >
            <Box textAlign="center" mb={2}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={makeImageUrl(post.thumbnail)}
                  alt={post.title}
                  sx={{ objectFit: "contain", p: 1 }}
                />
              </Card>
            </Box>
            <Box component="article">
              <Typography variant="h4" component="h2" gutterBottom>
                {post.title}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Chip
                  icon={<AccountCircleIcon />}
                  label={
                    post.author.first_name + " " + (post.author.last_name || "")
                  }
                  size="small"
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={dayjs(post.created_at).format("MMM DD, YYYY")}
                  size="small"
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" component="p" gutterBottom>
                  Share On:
                </Typography>

                <Box component="span">
                  {socialIcons.map((social, index) => {
                    const IconComp = social.icon;
                    return (
                      <IconButton
                        key={index}
                        href={social.href}
                        sx={{
                          color: "secondary",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        <IconComp width={20} height={20} />
                      </IconButton>
                    );
                  })}
                </Box>
                <Box component="span"></Box>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component={"div"}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: "sticky", top: 60 }}>
            <SectionTitle title="Popular Posts" />

            <Stack
              mt={2}
              direction="column"
              sx={{ borderRadius: BORDER_RADIUS.default, overflow: "hidden" }}
            >
              {popularPosts.map((post, index) => (
                <PopularPostCard
                  key={post.id}
                  post={post}
                  isLast={index === 4}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

export default SingleBlog;
