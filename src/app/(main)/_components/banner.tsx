import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Banner = () => {
    return (
        <Box
            sx={{
                my: 5,
                backgroundImage: "url('/assets/banner.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: { xs: 250, sm: 300, md: 380 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1,
                },
            }}
        >
            <Box position="relative" zIndex={2} color="white" textAlign="center">
                <Typography variant="subtitle2" gutterBottom>
                    The best seat in the house
                </Typography>
                <Typography variant="h2" fontWeight={600}>
                    Luxary Living for Less
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 3,
                        width: 200,
                        height: 50,
                    }}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};