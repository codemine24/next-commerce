import Box from "@mui/material/Box";
import React  from "react";

import { getSingleAddress } from "@/actions/address";

import EditAddress from "./_components/edit-address";

const AddressEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getSingleAddress(id);

  return (
    <Box>
      <EditAddress address={data.data} />
    </Box>
  );
};

export default AddressEditPage;
