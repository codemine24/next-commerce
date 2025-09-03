"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Attribute } from "@/interfaces/attribute";
import { ExpandMoreIcon } from "@/icons/expand-more";

interface ProductFilterProps {
    attributes: Attribute[];
}

interface SelectedFilters {
    values: Record<string, string[]>;
    order: string[];
}

export const ProductFilter = ({ attributes }: ProductFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>({
        values: {},
        order: [],
    });

    // Read from URL and sync to state
    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const values: Record<string, string[]> = {};
        const order: string[] = [];

        for (const [key, value] of params.entries()) {
            values[key] = value.split(",").map((v) => v.trim());
            order.push(key);
        }

        setSelectedFilters((prev) => {
            const same =
                JSON.stringify(prev.values) === JSON.stringify(values) &&
                JSON.stringify(prev.order) === JSON.stringify(order);
            return same ? prev : { values, order };
        });
    }, [searchParams]);

    // Debounced URL update
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams();

            selectedFilters.order.forEach((key) => {
                const values = selectedFilters.values[key];
                if (values && values.length > 0) {
                    params.set(key, values.join(","));
                }
            });

            const newQuery = params.toString();
            const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

            router.replace(newUrl);
        }, 100);

        return () => clearTimeout(timeout);
    }, [selectedFilters, pathname, router]);

    // Toggle filter values and track order
    const handleCheckboxChange = React.useCallback(
        (filterName: string, value: string) => {
            setSelectedFilters((prev) => {
                const currentValues = prev.values[filterName] || [];
                const updatedValues = currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value];

                const newValues = {
                    ...prev.values,
                    [filterName]: updatedValues,
                };

                if (updatedValues.length === 0) {
                    delete newValues[filterName];
                }

                const alreadyInOrder = prev.order.includes(filterName);
                const newOrder = alreadyInOrder
                    ? prev.order
                    : [...prev.order, filterName];

                const finalOrder =
                    updatedValues.length === 0
                        ? newOrder.filter((f) => f !== filterName)
                        : newOrder;

                return {
                    values: newValues,
                    order: finalOrder,
                };
            });
        },
        []
    );

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                px: 2,
                pb: 2,
                borderRadius: 2,
            }}
        >
            {attributes.map((attribute) => (
                <Accordion
                    key={attribute.id}
                    defaultExpanded
                    sx={{ boxShadow: "none", "&:before": { display: "none" } }}
                >
                    <AccordionSummary sx={{ p: 0 }} expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{attribute.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <FormGroup
                            sx={{
                                gap: 0.5,
                                px: 1,
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "auto",
                                flexWrap: "nowrap",
                            }}
                        >
                            {attribute.value.map((value) => (
                                <FormControlLabel
                                    key={value}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "& .MuiFormControlLabel-label": {
                                            fontSize: "16px",
                                            textTransform: "capitalize",
                                        },
                                    }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={
                                                selectedFilters.values[attribute.name]?.includes(value) || false
                                            }
                                            onChange={() => handleCheckboxChange(attribute.name, value)}
                                            sx={{ p: 0 }}
                                        />
                                    }
                                    label={value}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};