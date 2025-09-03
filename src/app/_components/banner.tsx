import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Banner = () => {
    return (
        <Box
            sx={{
                my: 5,
                backgroundImage: "url('/assets/banner.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: { xs: 250, md: 350 },
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
                    variant="outlined"
                    color="primary"
                    sx={{
                        mt: 3,
                        width: 200,
                        color: '#fff',
                        borderColor: '#fff',
                        borderRadius: 0,
                        '&:hover': {
                            color: '#000',
                            backgroundColor: '#fff',
                            transition: 'all 0.3s ease-in-out',
                        }
                    }}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};