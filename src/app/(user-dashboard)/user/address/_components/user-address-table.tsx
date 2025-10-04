import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

import { VisibilityIcon } from "@/icons/visibility";
import { getAddresses } from "@/actions/address";
import { useFetch } from "@/hooks/use-fetch";
import { API_ROUTES } from "@/lib/api-routes";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorComponent } from "@/components/error-component";
import { NotDataFound } from "@/components/not-data-found";
import { Address } from "@/interfaces/address";
import { AddressActionPopover } from "./address-action-popover";

export const UserAddressTable = () => {
  const { data, isLoading, success, message, revalidate } = useFetch(
    API_ROUTES.address.get_addresses
  );

  // Loading Spinner Component
  if (isLoading) return <LoadingSpinner />;

  // Error Component
  if (!success)
    return <ErrorComponent message={message} onRetry={() => revalidate()} />;
  console.log("table data:", data);

  return (
    <TableContainer
      component={Box}
      border={1}
      borderBottom={0}
      borderColor="divider"
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 1,
                borderColor: "divider",
                py: 0.5,
                fontSize: 13,
                backgroundColor: "background.paper",
              },
            }}
          >
            <TableCell
            // sx={{
            //   borderBottom: 1,
            //   borderColor: "divider",
            //   py: 0.5,
            //   fontSize: 13,
            //   backgroundColor: "background.paper",
            // }}
            >
              Full Name
            </TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Postcode</TableCell>
            <TableCell>Phone Number</TableCell>
            {/* <TableCell
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                py: 0.5,
                fontSize: 13,
                backgroundColor: "background.paper",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                py: 0.5,
                fontSize: 13,
                backgroundColor: "background.paper",
              }}
            >
              Delivery Method
            </TableCell> */}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length === 0 && <NotDataFound message="No data found" />}
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
                {/* <Chip size="small" label={"jjgd"} color="primary" /> */}
                {item.address}
              </TableCell>
              <TableCell>
                {/* <Chip size="small" label={"dfgfhd"} color="primary" /> */}
                {item.postal_code}
              </TableCell>
              <TableCell>{item.contact_number}</TableCell>
              {/* <TableCell
                sx={{
                  borderBottom: 1,
                  borderTop: 0,
                  borderColor: "divider",
                  py: 1,
                }}
              >
                {"yfydgufd"}
              </TableCell> */}
              {/* <TableCell
                sx={{
                  borderBottom: 1,
                  borderTop: 0,
                  borderColor: "divider",
                  py: 1,
                  textTransform: "capitalize",
                }}
              >
                {"hfgdfgudfj"}
              </TableCell> */}
              <TableCell
                sx={{
                  borderBottom: 1,
                  borderTop: 0,
                  borderColor: "divider",
                  py: 1,
                }}
              >
                <AddressActionPopover address={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
