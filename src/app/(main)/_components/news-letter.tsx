import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const NewsLetter = () => {
    return (
        <Box
            my={5}
            sx={{
                bgcolor: "primary.dark",
                backgroundImage: "url('/assets/news-letter.png')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: { xs: 250, md: 350 },
                width: "100%",
                display: "flex",
                alignItems: "center",
                p: 4,
            }}
        >
            <Box
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={4}
            >
                <Box flex={1}>
                    <Typography variant="h3" fontWeight={600}>
                        Don&apos;t miss out on the latest trends and offers
                    </Typography>
                    <Typography variant="body1" color="white" mt={2}>
                        Subscribe to our newsletter to get the latest updates on new arrivals, special offers, and more.
                    </Typography>
                </Box>
                <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <TextField
                        placeholder="Enter your email"
                        fullWidth
                        variant="outlined"
                        sx={{
                            bgcolor: "white",
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    border: 0,
                                    boxShadow: "none",
                                },
                                "&.Mui-focused fieldset": {
                                    border: 0,
                                    boxShadow: "none",
                                },
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            height: 56,
                            width: 200,
                        }}
                    >
                        Subscribe
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};