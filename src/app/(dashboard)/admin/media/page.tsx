import { Suspense } from "react";

import { getFiles } from "@/actions/file";

import { MediaContent } from "./_components/media-content";
import { MediaFilter } from "./_components/media-filter";
import { MediaHeader } from "./_components/media-header";

export default async function MediaPage() {
  const media = await getFiles();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaHeader />
      <MediaFilter />
      <MediaContent media={media.data} />
    </Suspense>
  );
}
