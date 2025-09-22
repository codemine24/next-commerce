import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getFiles } from "@/actions/file";

import { MediaContent } from "./_components/media-content";
import { MediaHeader } from "./_components/media-header";

export default async function MediaPage() {
  const media = await getFiles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box display="flex" flexDirection="column" gap={2}>
        <MediaHeader />
        <MediaContent media={media.data} />
      </Box>
    </Suspense>
  );
}
