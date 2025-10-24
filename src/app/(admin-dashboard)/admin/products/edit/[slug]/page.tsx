import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getBrands } from "@/actions/brand";
import { getCategories } from "@/actions/category";
import { getProductBySlug } from "@/actions/product";
import { ErrorComponent } from "@/components/error-component";
import { LoadingSpinner } from "@/components/loading-spinner";

import { EditProduct } from "./_components/edit-product";

type EditProductPageProps = {
  params: Promise<{ slug: string }>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  try {
    const { slug } = await params;
    const brandsPromise = getBrands();
    const categoriesPromise = getCategories();
    const productPromise = getProductBySlug(slug);

    const [brands, categories, product] = await Promise.all([
      brandsPromise,
      categoriesPromise,
      productPromise,
    ]);

    return (
      <Box pb={10}>
        <Suspense fallback={<LoadingSpinner />}>
          <EditProduct brands={brands.data} categories={categories.data} product={product.data} />
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
