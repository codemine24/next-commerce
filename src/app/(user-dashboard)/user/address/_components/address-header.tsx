import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AddressHeaderProps {
  title: string;
}

export const AddressHeader = ({ title }: AddressHeaderProps) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: "18px", fontWeight: "600" }}
        mb={2}
      >
        {title}
      </Typography>
    </Box>
  );
};
