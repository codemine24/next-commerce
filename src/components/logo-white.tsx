import { Stack, Typography } from "@mui/material";

export const LogoWhite = () => {
  return (
    <Stack spacing={1} direction={"row"} alignItems={"center"}>
      <Typography variant="h5" fontWeight={600}>
        Zero
      </Typography>
      <Typography variant="h5" fontWeight={300}>
        Commerce
      </Typography>
    </Stack>
  );
};
