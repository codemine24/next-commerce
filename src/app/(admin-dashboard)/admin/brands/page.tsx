import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";


import { BrandContent } from "./_components/brand-content";
import { BrandHeader } from "./_components/brand-header";

export default async function BrandPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <BrandHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <TableToolbar href="/admin/brands/create" addButtonText="Add Brand" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <BrandContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}