import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { SearchParams } from "@/interfaces/common";

import { CategoryContent } from "./_components/category-content";

export default async function CategoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CategoryContent searchParams={searchParams} />
        </Suspense>
    );
}