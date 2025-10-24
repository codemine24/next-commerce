"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { updateAddress } from "@/actions/address";
import { Address } from "@/interfaces/address";
import { toast } from "@/lib/toast-store";
import { addressSchema, AddressSchema } from "@/zod/address-schema";

import { AddressForm } from "../../_components/address-form";

interface EditAddressProps {
  address: Address 
}

const EditAddress = ({address}: EditAddressProps) => {
  const router = useRouter();
  const methods = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: address.name,
      contact_number: address.contact_number,
      secondary_contact_number: address.secondary_contact_number,
      email: address.email,
      address: address.address,
      postal_code: address.postal_code,
      city: address.city,
      district: address.district,
      country: address.country,
      is_default: false,
    },
  });

  const onSubmit = async (data: AddressSchema) => {
    const response = await updateAddress(address.id, data);
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    router.push("/user/address");
  };
  return (
    <>
      <AddressForm methods={methods} onSubmit={onSubmit}   />
    </>
  );
};

export default EditAddress;
