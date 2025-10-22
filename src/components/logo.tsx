import Box from "@mui/material/Box";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Box
        display="flex"
        alignItems="center"
        width={200}
        height="100%"
        component={Link}
        href="/"
        fontSize={20}
      >
        {/* <Image src="/images/logo.svg" alt="Logo" width={150} height={50} /> */}
        <Box sx={{ fontWeight: 900 }}>Zero</Box>
        <Box sx={{ fontWeight: 300 }}>Commerce</Box>
      </Box>
    </Link>
  );
};
