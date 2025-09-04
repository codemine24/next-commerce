"use client";

import React, { useMemo } from "react";
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
import { Button, Divider } from "@mui/material";
import { CloseIcon } from "@/icons/close";

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

    const sortAttributes = useMemo(() => attributes.sort((a, b) => a.name.localeCompare(b.name)), [attributes]);

    console.log(selectedFilters);

    return (
        <Box
            sx={{
                width: "100%",
                pr: 2,
                pb: 2,
                mt: 2
            }}
        >
            {selectedFilters.order.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setSelectedFilters({ values: {}, order: [] })}
                >
                    Clear All
                </Button>
            )}
            {selectedFilters.order.length > 0 && <Divider sx={{ my: 2 }} />}
            {/* Filter Applied */}
            <Box display="flex" flexDirection="column" gap={1}>
                {Object.entries(selectedFilters.values).map(([filterName, values], index) => (
                    values.map((value) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={1}
                            pl={2}
                            position="relative"
                            sx={{
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    bgcolor: "text.primary",
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="caption">{filterName}:</Typography>
                                <Typography variant="caption" fontWeight={600} textTransform="capitalize">{value}</Typography>
                            </Box>
                            <CloseIcon fontSize="small" onClick={() => handleCheckboxChange(filterName, value)} />
                        </Box>
                    ))
                ))}
            </Box>
            {selectedFilters.order.length > 0 && <Divider sx={{ my: 2 }} />}

            {/* Filter Options */}
            <Box>
                {sortAttributes.map((attribute, index) => (
                    <React.Fragment key={attribute.id}>
                        <Accordion
                            key={attribute.id}
                            defaultExpanded
                            sx={{
                                bgcolor: "transparent",
                                boxShadow: "none",
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary sx={{ p: 0 }} expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}>
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

                        {index < sortAttributes.length - 1 && <Divider sx={{ my: 0.5 }} />}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};