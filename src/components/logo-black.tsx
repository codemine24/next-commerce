import { Stack, Typography } from "@mui/material";

export const LogoBlack = () => {
  return (
    <Stack spacing={1} direction={"row"} alignItems={"center"}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="#03140e"
      >
        Zero
      </Typography>
      <Typography
        variant="h5"
        fontWeight={300}
        color="#03140e"
      >
        Commerce
      </Typography>
    </Stack>
  );
};