import { use } from "react";

import { getCategories } from "@/actions/category";
import { SearchParams } from "@/interfaces/common";

import { CategoryTable } from "./category.table";

export const CategoryContent = ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = use(searchParams);
    const data = use(getCategories(query));

    if (!data.success) return null;

    return <CategoryTable categories={data.data} meta={data.meta} />;
};