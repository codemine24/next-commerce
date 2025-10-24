import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import { getCategories } from '@/actions/category';
import { OptimizeImage } from '@/components/optimize-image';
import { Category } from '@/interfaces/category';
import { makeImageUrl } from '@/utils/helper';
import Link from 'next/link';

export const FeaturedCategory = async () => {
  const categories = await getCategories({ featured: true });

  return (
    <Box component="section" py={5}>
      <Grid container spacing={2}>
        {categories?.data?.map((category: Category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
            <Box
              sx={{
                p: 4,
                border: 1,
                borderColor: "divider",
                display: "block",
                cursor: "pointer",
              }}
              component={Link}
              href={`/collections/${category.slug}`}
            >
              <Box>
                <Typography variant="h2" color="text.primary">
                  {category.title}
                </Typography>
                <OptimizeImage
                  height={300}
                  sx={{ mt: 3 }}
                  alt={category.title}
                  src={makeImageUrl(category.icon)}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}