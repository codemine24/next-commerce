"use client";

import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const ProductDiscountLabel = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 10,
                left: 10,
                height: 30,
                width: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: (theme) => alpha((theme.palette.primary as unknown as { [key: string]: string })["100"], 0.1),
            }}
        >
            <Typography variant="body2" color="primary">20%</Typography>
        </Box>
    );
};