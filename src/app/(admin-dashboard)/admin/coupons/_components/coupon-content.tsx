import Box from "@mui/material/Box";

import { getCoupons } from "@/actions/coupon";
import { ErrorComponent } from "@/components/error-component";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { CouponTable } from "./coupon-table";

export const CouponContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = await searchParams;
    const data = await getCoupons(query);

    return (
        <Box>
            {/* Error Component */}
            {!data.success && <ErrorComponent message={data.message} />}

            {/* Coupon Table */}
            {data.success && (
                <>
                    <CouponTable coupons={data.data} />
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