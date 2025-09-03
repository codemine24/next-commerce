import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ArrowForwardIcon } from "@/icons/arrow-forward";
import Link from "next/link";

interface SectionTitleProps {
    title: string;
    href?: string;
}

export const SectionTitle = ({ title, href }: SectionTitleProps) => {
    return (
        <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" fontWeight={600}>
                {title}
            </Typography>
            {href && <Button component={Link} href={href} endIcon={<ArrowForwardIcon />} variant="text" color="primary">View All</Button>}
        </Box>
    );
};