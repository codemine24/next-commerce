"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { CloseIcon } from "@/icons/close";
import { ExpandMoreIcon } from "@/icons/expand-more";
import { FilterListIcon } from "@/icons/filter-list";
import { Meta } from "@/interfaces/api";

import { ProductAvailabilityFilter } from "../../collections/[slug]/_components/product-availability-filter";
import { ProductPriceSlider } from "../../collections/[slug]/_components/product-price-slider";

export const ProductFilterDrawer = ({ meta }: { meta: Meta }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        color="inherit"
        variant="outlined"
        startIcon={<FilterListIcon />}
        sx={{ borderColor: "divider" }}
      >
        Open Drawer
      </Button>

      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 400, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box px={4} py={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" fontWeight={700}>
              Filter
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Content */}
          <Box sx={{ px: 4, py: 2, overflowY: "auto", flex: 1 }}>
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
                <ProductAvailabilityFilter meta={meta} onClose={onClose} />
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
                <ProductPriceSlider meta={meta} onClose={onClose} />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};