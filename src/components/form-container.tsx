import { Box, SxProps } from "@mui/material";

export const FormContainer = ({ children, sx }: { children: React.ReactNode, sx?: SxProps }) => {
  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", ...sx }}>{children}</Box>
  );
};
