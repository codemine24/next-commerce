import { getBrands } from "@/actions/brand";
import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/product";

import { CreateCampaign } from "./_components/create-campaign";

const CreateCampaignPage = async () => {
    const productsPromise = getProducts();
    const brandsPromise = getBrands();
    const categoriesPromise = getCategories();

    const [products, brands, categories] = await Promise.all([
        productsPromise,
        brandsPromise,
        categoriesPromise,
    ]);

    return (
        <CreateCampaign
            products={products.data}
            brands={brands.data}
            categories={categories.data}
        />
    );
}

export default CreateCampaignPage;