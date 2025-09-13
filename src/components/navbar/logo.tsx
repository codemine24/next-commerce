import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width={200}
      height="100%"
      component={Link}
      href="/"
    >
      <Image src="/images/logo.svg" alt="Logo" width={150} height={50} />
    </Box>
  );
};
