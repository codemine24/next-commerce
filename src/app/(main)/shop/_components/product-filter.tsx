"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { ExpandMoreIcon } from "@/icons/expand-more";
import { Attribute } from "@/interfaces/attribute";
import { Category } from "@/interfaces/category";

interface ProductFilterProps {
  attributes: Attribute[];
  categories: Category[];
}

interface SelectedFilters {
  values: Record<string, string[]>;
  order: string[];
}

export const ProductFilter = ({ attributes, categories }: ProductFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>(
    {
      values: {},
      order: [],
    }
  );

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

  const sortAttributes = useMemo(
    () => attributes.sort((a, b) => a.name.localeCompare(b.name)),
    [attributes]
  );

  return (
    <Box
      sx={{
        width: "100%",
        pr: 2,
        pb: 2,
      }}
    >
      {/* Categories */}
      <Accordion
        defaultExpanded
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          border: 'none',
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          sx={{ p: 0 }}
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
        >
          <Typography variant="body1" fontWeight={600}>Categories</Typography>
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
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  gap: 1,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    textTransform: "capitalize",
                    mb: .5,
                    color: "text.secondary",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    checked={
                      selectedFilters.values["category"]?.includes(
                        category.title
                      ) || false
                    }
                    onChange={() =>
                      handleCheckboxChange("category", category.title)
                    }
                    sx={{ p: 0 }}
                  />
                }
                label={category.title}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

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
                border: 'none',
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                sx={{ p: 0 }}
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
              >
                <Typography variant="body1" fontWeight={600}>{attribute.name}</Typography>
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
                  {attribute.attribute_values.map((value) => (
                    <FormControlLabel
                      key={value.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        gap: 1,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
                          textTransform: "capitalize",
                          mb: .5,
                          color: "text.secondary",
                        },
                      }}
                      control={
                        <Checkbox
                          size="small"
                          checked={
                            selectedFilters.values[attribute.name]?.includes(
                              value.title
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(attribute.name, value.title)
                          }
                          sx={{ p: 0 }}
                        />
                      }
                      label={value.title}
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
