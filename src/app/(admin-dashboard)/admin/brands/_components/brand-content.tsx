import Box from "@mui/material/Box";

import { getBrands } from "@/actions/brand";
import { ErrorComponent } from "@/components/error-component";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { BrandTable } from "./brand-table";

export const BrandContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = await searchParams;
    const data = await getBrands(query);

    return (
        <Box>
            {/* Error Component */}
            {!data.success && <ErrorComponent message={data.message} />}

            {/* Brand Table */}
            {data.success && (
                <>
                    <BrandTable brands={data.data} />
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