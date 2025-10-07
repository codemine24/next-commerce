import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getBrands } from "@/actions/brand";
import { getProductBySlug } from "@/actions/product";
import { ErrorComponent } from "@/components/error-component";
import { LoadingSpinner } from "@/components/loading-spinner";

import { EditProduct } from "./_components/edit-product";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  try {
    const { slug } = await params;
    const brandsPromise = getBrands();
    const productPromise = getProductBySlug(slug);

    const [brands, product] = await Promise.all([
      brandsPromise,
      productPromise,
    ]);

    return (
      <Box pb={10}>
        <Suspense fallback={<LoadingSpinner />}>
          <EditProduct brands={brands.data} product={product.data} />
        </Suspense>
      </Box>
    );
  } catch (error: any) {
    return (
      <ErrorComponent
        message={
          error.message || "Sorry, there was an error loading the product data."
        }
      />
    );
  }
};

export default EditProductPage;
