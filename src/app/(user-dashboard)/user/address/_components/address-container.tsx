"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { AddAddressButton } from "./add-address-button";
import { AddressHeader } from "./address-header";
import { UserAddressTable } from "./user-address-table";

export default function AddressContainer() {
  const router = useRouter();

  return (
    <Box>
      {/* {!selectedAddress.mode ? ( */}
      <Box>
        <AddressHeader title="Your Addresses" />
        <Box>
          <AddAddressButton
            variant="contained"
            onClick={() => router.push("/user/address/create")}
          >
            Add Address
          </AddAddressButton>
        </Box>
        <Box mt={2}>
          <UserAddressTable />
        </Box>
      </Box>
    </Box>
  );
}
