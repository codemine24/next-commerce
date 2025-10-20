"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { addAddresses } from "@/actions/address";
import { toast } from "@/lib/toast-store";
import { addressSchema, AddressSchema } from "@/zod/address-schema";

import { AddressForm } from "../../_components/address-form";
import { AddressHeader } from "../../_components/address-header";

const CreateAddress = () => {
  const router = useRouter();
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
    const response = await addAddresses(data);
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    router.push("/user/address");
    console.log(response);
  };
  return (
    <>
      <AddressHeader title="Add New Address" />
      <AddressForm methods={methods} onSubmit={onSubmit} />
    </>
  );
};

export default CreateAddress;