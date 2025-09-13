import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { ArrowForwardIcon } from "@/icons/arrow-forward";

interface SectionTitleProps {
  title: string;
  href?: string;
}

export const SectionTitle = ({ title, href }: SectionTitleProps) => {
  return (
    <Box
      mb={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h2">
        {title}
      </Typography>
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
