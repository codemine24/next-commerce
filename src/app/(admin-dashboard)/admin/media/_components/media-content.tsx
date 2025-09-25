import { Box } from "@mui/material";

import { getFiles } from "@/actions/file";
import { ErrorComponent } from "@/components/error";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { MediaTable } from "./media-table";

export const MediaContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = await searchParams;
    const data = await getFiles(query);

    return (
        <>
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
        </>
    );
};