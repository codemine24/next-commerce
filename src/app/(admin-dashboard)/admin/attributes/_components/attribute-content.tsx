import Box from "@mui/material/Box";

import { getAttributes } from "@/actions/attribute";
import { ErrorComponent } from "@/components/error-component";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

export const AttributeContent = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const query = await searchParams;
  const data = await getAttributes(query);

  return (
    <Box>
      {/* Error Component */}
      {!data.success && <ErrorComponent message={data.message} />}

      {/* Attribute Table */}
      {data.success && (
        <>
          {/* <CategoryTable categories={data.data} /> */}
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
  );
};
