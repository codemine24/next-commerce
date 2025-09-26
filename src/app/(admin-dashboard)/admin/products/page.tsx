import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { ProductContent } from "./_components/product-content";
import { ProductHeader } from "./_components/product-header";

export default async function ProductList({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <ProductHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <TableToolbar href="/admin/products/create" addButtonText="Add Product" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <ProductContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}