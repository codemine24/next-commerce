import Box from "@mui/material/Box";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { SearchParams } from "@/interfaces/common";

import { MediaContent } from "./_components/media-content";
import { MediaFilter } from "./_components/media-filter";
import { MediaFilterSkeleton } from "./_components/media-filter-skeleton";
import { MediaHeader } from "./_components/media-header";
import { MediaTabs } from "./_components/media-tabs";

export default async function MediaPage({ searchParams }: { searchParams: Promise<SearchParams> }) {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <MediaHeader />
      <Box bgcolor="background.default" border={1} borderColor="divider">
        <MediaTabs />

        {/* Media Filter */}
        <Suspense fallback={<MediaFilterSkeleton />}>
          <MediaFilter />
        </Suspense>

        {/* Media Content */}
        <Suspense fallback={<LoadingSpinner />}>
          <MediaContent searchParams={searchParams} />
        </Suspense>
      </Box>
    </Box>
  );
}
