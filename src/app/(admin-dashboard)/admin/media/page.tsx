import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getFiles } from "@/actions/file";
import { ErrorComponent } from "@/components/error";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { MediaFilter } from "./_components/media-filter";
import { MediaFilterSkeleton } from "./_components/media-filter-skeleton";
import { MediaHeader } from "./_components/media-header";
import { MediaTable } from "./_components/media-table";
import { MediaTabs } from "./_components/media-tabs";

export default async function MediaPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = await searchParams;
  const data = await getFiles(query);

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
          {/* Error Component */}
          {!data.success && <ErrorComponent message={data.message} />}

          {/* Media Table */}
          {data.success && (
            <>
              <MediaTable media={data.data} />
              <Box
                p={2}
                bgcolor="background.default"
                border={1}
                borderBottom={0}
                borderColor="divider"
              >
                <Pagination
                  page={data.meta.page}
                  total={data.meta.total}
                  limit={data.meta.limit}
                />
              </Box>
            </>
          )}
        </Suspense>
      </Box>
    </Box>
  );
}
