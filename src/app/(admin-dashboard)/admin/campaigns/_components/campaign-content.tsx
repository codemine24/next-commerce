import Box from "@mui/material/Box";

import { getCampaigns } from "@/actions/campaign";
import { ErrorComponent } from "@/components/error";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { CampaignTable } from "./campaign-table";

export const CampaignContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = await searchParams;
    const data = await getCampaigns(query);

    return (
        <Box>
            {/* Error Component */}
            {!data.success && <ErrorComponent message={data.message} />}

            {/* Campaign Table */}
            {data.success && (
                <>
                    <CampaignTable campaigns={data.data} />
                    <Box
                        p={2}
                        bgcolor="background.default"
                        borderTop={1}
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
        </Box>
    )
};