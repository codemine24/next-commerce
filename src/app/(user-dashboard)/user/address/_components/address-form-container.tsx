import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addAddresses } from "@/actions/address";
import { Address } from "@/interfaces/address";
import { addressSchema, AddressSchema } from "@/zod/address-schema";

import { AddressForm } from "./address-form";

interface AddressFormContainerProps {
  onCancel: () => void;
  selectedAddress: Address | null;
}

export const AddressFormContainer = ({
  onCancel,
  selectedAddress,
}: AddressFormContainerProps) => {
  const methods = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: selectedAddress?.name || "",
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
    await addAddresses(data);
    onCancel();
  };

  return (
    <>
      <AddressForm methods={methods} onSubmit={onSubmit} />
    </>
  );
};
