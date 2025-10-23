import { Box, Divider, Grid, Typography } from "@mui/material";
import { Suspense } from "react";

import { getCategories } from "@/actions/category";
import { BoxContainer } from "@/components/box-container";

import { CollectionCard } from "./_components/collection-box";
import { CollectionView } from "./_components/collection-view";

const CollectionsPage = async () => {
  const data = await getCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoxContainer sx={{ py: "60px" }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Collections
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {data?.data?.map((cat: any) => (
            <Grid size={{ xs: 12, md: 4 }} key={cat.id}>
              <CollectionCard
                image="/images/collections/collections.webp"
                title={cat.title}
                href={`/categories/${cat.id}`}
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
