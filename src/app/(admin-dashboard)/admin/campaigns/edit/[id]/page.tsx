import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getBrands } from "@/actions/brand";
import { getCampaignById } from "@/actions/campaign";
import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/product";
import { ErrorComponent } from "@/components/error-component";
import { LoadingSpinner } from "@/components/loading-spinner";

import { EditCampaign } from "./_components/edit-campaign";

const EditCampaignPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    try {
        const brandsPromise = getBrands();
        const productsPromise = getProducts();
        const categoriesPromise = getCategories();
        const campaignPromise = getCampaignById(id);

        const [brands, products, categories, campaign] = await Promise.all([
            brandsPromise,
            productsPromise,
            categoriesPromise,
            campaignPromise,
        ]);

        return (
            <Box pb={10}>
                <Suspense fallback={<LoadingSpinner />}>
                    <EditCampaign
                        brands={brands.data}
                        products={products.data}
                        categories={categories.data}
                        campaign={campaign.data}
                    />
                </Suspense>
            </Box>
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return <ErrorComponent message="Sorry, there was an error loading the campaign data." />;
    }
};

export default EditCampaignPage;