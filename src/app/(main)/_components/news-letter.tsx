import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const NewsLetter = () => {
    return (
        <Box
            my={5}
            sx={{
                bgcolor: "primary.main",
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
            >
                <Box width="50%">
                    <Typography variant="h3" fontWeight={600}>
                        Don&apos;t miss out on the latest trends and offers
                    </Typography>
                    <Typography variant="body1" color="white" mt={2}>
                        Subscribe to our newsletter to get the latest updates on new arrivals, special offers, and more.
                    </Typography>
                </Box>
                <Box
                    width="50%"
                    display="flex"
                    gap={2}
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
                                    borderColor: "transparent",
                                    boxShadow: "none",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "transparent",
                                    boxShadow: "none",
                                },
                            },
                        }}
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            height: 56,
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
                        Subscribe
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};