"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { ExpandMoreIcon } from "@/icons/expand-more";
import { Meta } from "@/interfaces/api";

import { ProductAvailabilityFilter } from "./product-availability-filter";
import { ProductPriceSlider } from "./product-price-slider";

export const ProductFilter = ({ meta }: { meta: Meta }) => {
    return (
        <Box
            sx={{
                p: 2,
                width: 300,
                border: 1,
                borderColor: "divider",
            }}
        >
            {/* Header */}
            <Box py={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" fontWeight={700}>
                    Filter
                </Typography>
            </Box>

            <Divider />

            {/* Content */}
            <Box>
                {/* Availability */}
                <Accordion
                    defaultExpanded
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        border: "none",
                        "&:before": { display: "none" },
                    }}
                >
                    <AccordionSummary
                        sx={{ p: 0 }}
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
                    >
                        <Typography variant="body1" fontWeight={600}>
                            Availability
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ p: 0 }}>
                        <ProductAvailabilityFilter meta={meta} />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                {/* Price */}
                <Accordion
                    defaultExpanded
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        border: "none",
                        "&:before": { display: "none" },
                    }}
                >
                    <AccordionSummary
                        sx={{ p: 0 }}
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
                    >
                        <Typography variant="body1" fontWeight={600}>
                            Price
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ p: 0 }}>
                        <ProductPriceSlider meta={meta} />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};