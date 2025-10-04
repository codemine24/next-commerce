import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  Box,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addAddresses } from "@/actions/address";
import { addressSchema, AddressSchema } from "@/zod/address-schema";
import { AddressHeader } from "./address-header";
import { Checkbox, TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { AddressForm } from "./address-form";

// interface AddressFormProps {
//   onCancel: () => void;
// }

interface AddressFormContainerProps {
  onCancel: () => void;
}

export const AddressFormContainer = ({
  onCancel,
}: AddressFormContainerProps) => {
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

  console.log(methods.formState.errors);

  const onSubmit = async (data: AddressSchema) => {
    const response = await addAddresses(data);
    onCancel();
    console.log("Form Data:", data);

    console.log("Response ", response);
  };

  //   const handleCancel = () => {
  //     methods.reset();
  //     onCancel();
  //   };
  return (
    <>
      <AddressForm methods={methods} onSubmit={onSubmit} onCancel={onCancel} />
    </>
  );
};
