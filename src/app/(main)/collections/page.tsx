import { Box, Divider, Grid, Typography } from "@mui/material";
import { Suspense } from "react";

import { getCategories } from "@/actions/category";
import { BoxContainer } from "@/components/box-container";
import { Category } from "@/interfaces/category";

import { CollectionCard } from "./_components/collection-card";
import { CollectionView } from "./_components/collection-view";

const CollectionsPage = async () => {
  const res = await getCategories();
  const categories = res.data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoxContainer sx={{ py: "60px" }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Catalog
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories?.map((category: Category) => (
            <Grid size={{ xs: 12, md: 4 }} key={category.id}>
              <CollectionCard
                image="/images/collections/collections.webp"
                title={category.title}
                href={`/collections/${category.slug}`}
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: "100px" }} />
        <Box>
          <CollectionView />
        </Box>
      </BoxContainer>
    </Suspense>
  );
};

export default CollectionsPage;
