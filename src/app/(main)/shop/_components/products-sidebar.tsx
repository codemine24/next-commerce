import Box from "@mui/material/Box";

import { getAttributes } from "@/actions/attribute";
import { getCategories } from "@/actions/category";
import { SearchParams } from "@/interfaces/common";

import { ProductFilter } from "./product-filter";

export const ProductSidebar = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const query = await searchParams;
  const queryParams = query.category ? { category: query.category } : undefined;
  const attributesPromise = getAttributes(queryParams);
  const categoriesPromise = getCategories();

  const [attributes, categories] = await Promise.all([
    attributesPromise,
    categoriesPromise,
  ]);

  return (
    <Box
      width="100%"
      maxWidth={250}
      display={{ xs: "none", lg: "block" }}
      sx={{ border: "1px solid", borderColor: "divider", p: 2, height: "100%" }}
    >
      <ProductFilter
        attributes={attributes.data}
        categories={categories.data}
      />
    </Box>
  );
};
