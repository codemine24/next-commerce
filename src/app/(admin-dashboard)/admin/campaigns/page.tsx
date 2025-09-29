import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { CampaignContent } from "./_components/campaign-content";
import { CampaignHeader } from "./_components/campaign-header";

export default async function CampaignPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <CampaignHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <TableToolbar href="/admin/campaigns/create" addButtonText="Add Campaign" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <CampaignContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}