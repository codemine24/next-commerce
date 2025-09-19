import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { ArrowForwardIcon } from "@/icons/arrow-forward";


interface SectionTitleProps {
  title: string;
  href?: string;
  sx?: SxProps;
}

export const SectionTitle = ({ title, href, sx }: SectionTitleProps) => {
  return (
    <Box
      mb={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={sx}
    >
      <Typography variant="h2">{title}</Typography>
      {href && (
        <Button
          component={Link}
          href={href}
          endIcon={<ArrowForwardIcon />}
          variant="text"
          color="primary"
        >
          View All
        </Button>
      )}
    </Box>
  );
};
