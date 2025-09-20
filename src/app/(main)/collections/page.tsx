import { BoxContainer } from "@/components/box-container";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/navigation";
import { CollectionBox } from "./_components/collection-box";

const CollectionsPage = () => {
  return (
    <>
      <BoxContainer sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Catalog
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CollectionBox
              image="/images/collections/collections.webp"
              title="All Collections"
              href="https://example.com/collections"
            />
          </Grid>
        </Grid>
      </BoxContainer>
    </>
  );
};

export default CollectionsPage;
