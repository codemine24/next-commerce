import { getCategories } from "@/actions/category";
import { SearchParams } from "@/interfaces/common";

import { CategoryTable } from "./category.table";
import { Box } from "@mui/material";
import { DataTable } from "@/components/data-table";
import { ErrorComponent } from "@/components/error";

export const CategoryContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = await searchParams;
    const data = await getCategories(query);

    return (
        <Box>
            {/* Error Component */}
            {!data.success && <ErrorComponent message={data.message} />}
            {data.success && <CategoryTable categories={data.data} />}
        </Box>
    )
};