"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OptimizeImage from "@/components/ui/optimize-image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { SectionTitle } from "../section-title";

export const CategoriesSection = () => {
    const testimonials = [
        { image: "", title: "Mobile Phones" },
        { image: "", title: "Laptops" },
        { image: "", title: "Tablets" },
        { image: "", title: "Accessories" },
        { image: "", title: "Clothes" },
        { image: "", title: "Footwear" },
        { image: "", title: "Home Appliances" },
        { image: "", title: "Beauty & Health" },
    ];

    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const columns = isSmDown ? 2 : isMdDown ? 3 : 4;

    return (
        <Box component="section" py={5}>
            <SectionTitle title="Shop By Categories" href="/shop" />
            <Grid container spacing={0}>
                {testimonials.map((testimonial, index) => {
                    const isLastColumn = (index + 1) % columns === 0;
                    const isLastRow = index >= testimonials.length - columns;

                    return (
                        <Grid
                            key={index}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <Box
                                sx={{
                                    borderTop: '1px solid',
                                    borderLeft: '1px solid',
                                    borderRight: isLastColumn ? '1px solid' : 'none',
                                    borderBottom: isLastRow ? '1px solid' : 'none',
                                    borderColor: theme.palette.divider,
                                    borderRadius: 0,
                                    p: 4,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <OptimizeImage
                                    src="/assets/category.webp"
                                    alt={testimonial.title}
                                    width={150}
                                    height={150}
                                />
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {testimonial.title}
                                </Typography>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};