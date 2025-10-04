"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import { addAddresses } from "@/actions/address";
import { AddressSchema } from "@/zod/address-schema";
import { AddressHeader } from "./address-header";
import { AddAddressButton } from "./add-address-button";
import { AddressFormContainer } from "./address-form-container";
import { UserAddressTable } from "./user-address-table";

export default function AddressContainer() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Box>
      {!showForm ? (
        <Box>
          <AddressHeader title="Your Addresses" />
          <Box>
            <AddAddressButton variant="contained" onClick={handleShowForm}>
              Add Address
            </AddAddressButton>
          </Box>
          <Box mt={2}>
            <UserAddressTable />
          </Box>
        </Box>
      ) : (
        <AddressFormContainer onCancel={handleShowForm} />
      )}
    </Box>
  );
}
