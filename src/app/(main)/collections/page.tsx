import { Box, Divider, Grid, Typography } from "@mui/material";
import { getCategories } from "@/actions/category";
import { BoxContainer } from "@/components/box-container";
import { CollectionCard } from "./_components/collection-box";
import { CollectionView } from "./_components/collection-view";

const CollectionsPage = async () => {
  const res = await getCategories();
  const categories = res.data;
  console.log(categories);

  return (
    <>
      <BoxContainer sx={{ py: "60px" }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Catalog
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories.map((cat: any) => (
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
    </>
  );
};

export default CollectionsPage;
