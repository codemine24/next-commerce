import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { CouponContent } from "./_components/coupon-content";
import { CouponHeader } from "./_components/coupon-header";

export default async function CouponPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <CouponHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <TableToolbar href="/admin/coupons/create" addButtonText="Add Coupon" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <CouponContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}