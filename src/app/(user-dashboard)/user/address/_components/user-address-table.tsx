import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { ErrorComponent } from "@/components/error-component";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotDataFound } from "@/components/not-data-found";
import { useFetch } from "@/hooks/use-fetch";
import { Address } from "@/interfaces/address";
import { API_ROUTES } from "@/lib/api-routes";

import { AddressActionPopover } from "./address-action-popover";

export const UserAddressTable = ({}) => {
  const { data, isLoading, success, message, revalidate } = useFetch(
    API_ROUTES.address.get_addresses
  );

  // Loading Spinner Component
  if (isLoading) return <LoadingSpinner />;

  // Error Component
  if (!success)
    return <ErrorComponent message={message} onRetry={() => revalidate()} />;
 

  return (
    <TableContainer component={Box}>
      {data?.length === 0 ? (
        <NotDataFound message="No data found" />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Postcode</TableCell>
              <TableCell>Phone Number</TableCell>

              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item: Address) => (
              <TableRow
                key={item.id}
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    py: 1,
                    borderBottom: 1,
                    borderTop: 0,
                    borderColor: "divider",
                  },
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {" "}
                  {item.is_default && (
                    <Chip
                      label="Default"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ height: 22, fontSize: 12, color: "#ffffff", mr: 1 }}
                    />
                  )}
                  {item.address}
                </TableCell>
                <TableCell>{item.postal_code}</TableCell>
                <TableCell>{item.contact_number}</TableCell>

                <TableCell
                  sx={{
                    borderBottom: 1,
                    borderTop: 0,
                    borderColor: "divider",
                    py: 1,
                  }}
                >
                  <AddressActionPopover address={item} onDeleted={revalidate} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};