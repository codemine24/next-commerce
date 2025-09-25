import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { SearchParams } from "@/interfaces/common";

import { CategoryContent } from "./_components/category-content";
import { CategoryHeader } from "./_components/category-header";
import { CategoryTableToolbar } from "./_components/category-table-toolbar";

export default async function CategoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {

    return (
        <Box>
            <CategoryHeader />
            <Box border={1} borderColor="divider">
                <CategoryTableToolbar />
                <Suspense fallback={<LoadingSpinner />}>
                    <CategoryContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}