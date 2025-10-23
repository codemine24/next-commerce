import Box from "@mui/material/Box";

import { getUsers } from "@/actions/user";
import { ErrorComponent } from "@/components/error-component";
import { Pagination } from "@/components/pagination";
import { SearchParams } from "@/interfaces/common";

import { UserTable } from "./user-table";

export const UserContent = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const query = await searchParams;
  const data = await getUsers(query);

  return (
    <Box>
      {/* Error Component */}
      {!data.success && <ErrorComponent message={data.message} />}

      {/* User Table */}
      {data.success && (
        <>
          <UserTable users={data.data} />
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
