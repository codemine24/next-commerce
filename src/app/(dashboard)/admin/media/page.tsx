import Box from "@mui/material/Box";

import { getFiles } from "@/actions/file";

import { MediaContent } from "./_components/media-content";
import { MediaFilter } from "./_components/media-filter";
import { MediaHeader } from "./_components/media-header";

export default async function MediaPage() {
    const data = await getFiles();

    return (
        <Box>
            <MediaHeader />
            <MediaFilter />
            <MediaContent media={data?.data} />
        </Box>
    );
}