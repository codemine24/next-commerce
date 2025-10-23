import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export const LogoWhite = () => {
  return (
    <Link href="/">
      <Stack spacing={1} direction={"row"} alignItems={"center"}>
        <Typography variant="h5" fontWeight={600}>
          Zero
        </Typography>
        <Typography variant="h5" fontWeight={300}>
          Commerce
        </Typography>
      </Stack>
    </Link>
  );
};
