import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CreateBrand } from "./_components/create-brand";

export default function BrandCreate() {
  return (
    <Box pb={10}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Create Brand
      </Typography>
      <CreateBrand />
    </Box>
  );
}
