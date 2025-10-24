import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { addressSchema, AddressSchema } from "@/zod/address-schema";

import { AddressForm } from "./address-form";

interface AddressFormContainerProps {
  onCancel: () => void;
}

export const AddressEditForm = ({ onCancel }: AddressFormContainerProps) => {
  const methods = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      contact_number: "",
      secondary_contact_number: "",
      email: "",
      address: "",
      postal_code: "",
      city: "",
      district: "",
      country: "",
      is_default: false,
    },
  });

  const onSubmit = async (data: AddressSchema) => {
    onCancel();
  };

  return (
    <>
      <AddressForm methods={methods} onSubmit={onSubmit} />
    </>
  );
};
