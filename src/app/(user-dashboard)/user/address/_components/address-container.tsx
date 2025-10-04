"use client";
import { Box } from "@mui/material";
import { useState } from "react";

import { Address } from "@/interfaces/address";

import { AddAddressButton } from "./add-address-button";
import { AddressFormContainer } from "./address-form-container";
import { AddressHeader } from "./address-header";
import { UserAddressTable } from "./user-address-table";

export default function AddressContainer() {
  const [selectedAddress, setSelectedAddress] = useState<{
    mode: "create" | "edit" | null;
    data: Address | null;
  }>({
    mode: null,
    data: null,
  });

  return (
    <Box>
      {!selectedAddress.mode ? (
        <Box>
          <AddressHeader title="Your Addresses" />
          <Box>
            <AddAddressButton
              variant="contained"
              onClick={() =>
                setSelectedAddress({
                  mode: "create",
                  data: null,
                })
              }
            >
              Add Address
            </AddAddressButton>
          </Box>
          <Box mt={2}>
            <UserAddressTable setSelectedAddress={setSelectedAddress} />
          </Box>
        </Box>
      ) : (
        <AddressFormContainer
          onCancel={() => setSelectedAddress({ mode: null, data: null })}
          selectedAddress={selectedAddress.data}
        />
      )}
    </Box>
  );
}
