import { SxProps } from "@mui/material";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";

interface BoxContainerProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const BoxContainer = ({ children, sx }: BoxContainerProps) => {
  return (
    <Container
      sx={{
        maxWidth: "1340px !important",
        mx: "auto",
        width: { xs: "97%", md: "95%", lg: "90%" },
        px: "0px !important",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
