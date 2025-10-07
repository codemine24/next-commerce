import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { dateFormatter } from "@/utils/date-formatter";

const images = [
  "/images/blog/blog-1.svg",
  "/images/blog/blog-2.svg",
  "/images/blog/blog-3.svg",
];

export const RecentBlogs = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ border: "1px solid #EFEDFA" }}
          >
            <OptimizeImage
              src={image}
              alt="Blog"
              height={250}
              imageStyle={{ objectFit: "cover" }}
            />
            <Box py={2.5} pl={2.5}>
              <Typography variant="h5" gutterBottom>
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
