import Box from "@mui/material/Box";
import Image from "next/image";

export const Logo = () => {
  return (
    <Box display="flex" alignItems="center" width={200} height="100%">
      <Image src="/images/logo.svg" alt="Logo" width={150} height={50} />
    </Box>
  );
};
