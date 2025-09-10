import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";

import { SectionTitle } from "./section-title";

export const RecentBlogs = () => {
  return (
    <Box>
      <SectionTitle title="Recent Blogs" />
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <OptimizeImage
              src="https://placehold.co/600x400/png"
              alt="Blog"
              height={300}
              imageStyle={{ objectFit: "cover" }}
            />
            <Box py={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By Admin on {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
