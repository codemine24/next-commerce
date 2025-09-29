import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { UserContent } from "./_components/user-content";
import { UserHeader } from "./_components/user-header";
import { UserTabs } from "./_components/user-tabs";

export default async function UserList({ searchParams }: { searchParams: Promise<SearchParams> }) {
    return (
        <Box>
            <UserHeader />
            <Box border={1} borderColor="divider">
                <Suspense fallback={<TableToolbarSkeleton />}>
                    <UserTabs />
                    <TableToolbar href="/admin/users/create" addButtonText="Add User" />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <UserContent searchParams={searchParams} />
                </Suspense>
            </Box>
        </Box>
    );
}