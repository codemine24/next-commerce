"use client";
import { Box } from "@mui/material";
import { useState } from "react";

import { addAddresses } from "@/actions/address";
import { AddressSchema } from "@/zod/address-schema";

import { AddAddressButton } from "./_components/add-address-button";
import AddAddressForm from "./_components/add-address-form";
import { AddressHeader } from "./_components/address-header";

export default function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const handleAddressSubmit = async (data: AddressSchema) => {
    const res = await addAddresses(data);
    console.log(res);

    setShowForm(false);
  };
  const handleCancelForm = () => {
    console.log("Add address form cancelled");
    setShowForm(false);
  };
  return (
    <Box>
      {!showForm ? ( // Conditional rendering for the initial view
        <Box border={1} borderColor="divider">
          <AddressHeader title="Your Addresses" />
          <Box sx={{ p: 2 }}>
            <AddAddressButton
              variant="contained"
              onClick={() => setShowForm(true)}
            >
              Add Address
            </AddAddressButton>
          </Box>
        </Box>
      ) : (
        <AddAddressForm
          onSubmit={handleAddressSubmit}
          onCancel={handleCancelForm}
        />
      )}
    </Box>
  );
}
