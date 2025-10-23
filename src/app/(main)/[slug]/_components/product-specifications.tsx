import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ProductSectionHeader } from "./product-section-header";

export const ProductSpecification = ({
  specification,
}: {
  specification: string | null;
}) => {
  return (
    <Box id="product-specifications">
      <ProductSectionHeader title="Specifications" />
      <Box sx={{ bgcolor: "background.paper", p: { xs: 2, sm: 3 } }}>
        {specification && (
          <div dangerouslySetInnerHTML={{ __html: specification }} />
        )}
        {!specification && (
          <Typography variant="body2">No specification available</Typography>
        )}
      </Box>
    </Box>
  );
};
