import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";
import { SearchParams } from "@/interfaces/common";

import { AttributeHeader } from "../attributes/_components/attribute-header";

import { AttributeContent } from "./_components/attribute-content";

export default async function AttributePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Box>
      <AttributeHeader />
      <Box border={1} borderColor="divider">
        <Suspense fallback={<TableToolbarSkeleton />}>
          <TableToolbar
            href="/admin/attributes/create"
            addButtonText="Add Attribute"
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AttributeContent searchParams={searchParams} />
        </Suspense>
      </Box>
    </Box>
  );
}
