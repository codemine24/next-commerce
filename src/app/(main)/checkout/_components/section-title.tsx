import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface SectionTitleProps {
    title: string;
    step: number;
}

export const SectionTitle = ({ title, step }: SectionTitleProps) => {
    return (
        <Typography variant="h6" gutterBottom>
            <Box
                component="span"
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    borderRadius: "50px",
                    width: "30px",
                    height: "30px",
                    display: "inline-block",
                    textAlign: "center",
                    lineHeight: "30px",
                    mr: 1,
                }}
            >
                {step}
            </Box>
            {title}
        </Typography>
    )
};