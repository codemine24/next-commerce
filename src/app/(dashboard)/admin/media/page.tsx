import { Suspense } from "react";

import MediaView from "./_components/media-view";

export default function MediaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaView />
    </Suspense>
  );
}
