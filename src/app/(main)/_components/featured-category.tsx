import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import { getCategories } from '@/actions/category';
import { OptimizeImage } from '@/components/optimize-image';
import { Category } from '@/interfaces/category';
import { makeImageUrl } from '@/utils/helper';

export const FeaturedCategory = async () => {
  const categories = await getCategories({ featured: true });

  return (
    <Box component="section" py={5}>
      <Grid container spacing={2}>
        {categories.data?.map((category: Category) => (
          <Grid size={{ xs: 12, sm: 4 }} key={category.id}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0,
                boxShadow: "none",
                bgcolor: "transparent",
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="h2" color="text.primary">
                  {category.title}
                </Typography>
                <OptimizeImage
                  height={300}
                  sx={{ mt: 3 }}
                  alt={category.title}
                  src={makeImageUrl(category.icon)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
