import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { CategoryContent } from "./_components/category-content";
import { CategoryHeader } from "./_components/category-header";

export default async function CategoryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <CategoryHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <TableToolbar href="/admin/categories/create" addButtonText="Add Category" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <CategoryContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}