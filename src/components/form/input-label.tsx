import { SxProps, Typography } from "@mui/material";

interface InputLabelProps {
    label: string;
    required?: boolean;
    sx?: SxProps;
}

export const InputLabel = ({ label, required, sx }: InputLabelProps) => {
    return (
        <Typography variant="body2" mb={0.5} fontWeight={600} sx={sx}>
            {label}
            <Typography color="error" component="span" ml={0.5}>{required ? "*" : ""}</Typography>
        </Typography>
    );
};