import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { dateFormatter } from "@/utils/date-formatter";

import { SectionTitle } from "./section-title";

const images = [
  "/images/blog/blog-1.svg",
  "/images/blog/blog-2.svg",
  "/images/blog/blog-3.svg",
]

export const RecentBlogs = () => {
  return (
    <Box>
      <SectionTitle title="Recent Blogs" />
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <OptimizeImage
              src={image}
              alt="Blog"
              height={250}
              imageStyle={{ objectFit: "cover" }}
            />
            <Box py={2}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                First Time Home Owner Ideas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By Admin on {dateFormatter(new Date())}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
