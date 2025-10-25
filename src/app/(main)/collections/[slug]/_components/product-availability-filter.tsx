"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Meta } from "@/interfaces/api";

export const ProductAvailabilityFilter = ({ meta }: { meta: Meta }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Stock filters
    const stockFilters = [
        { key: "in_stock", label: "In Stock", count: meta?.in_stock },
        { key: "out_of_stock", label: "Out of Stock", count: meta?.out_of_stock },
    ].filter((item) => item.count && item.count > 0);

    // Get initial values from URL
    const initialSelected = searchParams.get("availability")?.split(",") || [];
    const [selectedAvailability, setSelectedAvailability] = useState<string[]>(initialSelected);

    // Handle checkbox toggle
    const handleAvailabilityChange = (key: string) => {
        let updated: string[];
        if (selectedAvailability.includes(key)) {
            updated = selectedAvailability.filter((item) => item !== key);
        } else {
            updated = [...selectedAvailability, key];
        }
        setSelectedAvailability(updated);

        // Update URL params
        const params = new URLSearchParams(searchParams.toString());

        if (updated.length > 0) {
            params.set("availability", updated.join(","));
        } else {
            params.delete("availability");
        }

        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        const current = searchParams.get("availability")?.split(",") || [];
        setSelectedAvailability(current);
    }, [searchParams]);

    return (
        <FormGroup
            sx={{
                gap: 0.5,
                px: 1,
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
            }}
        >
            {stockFilters.map(({ key, label, count }) => (
                <FormControlLabel
                    key={key}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        gap: 0.5,
                        "& .MuiFormControlLabel-label": {
                            fontSize: 14,
                            textTransform: "capitalize",
                            color: "text.secondary",
                        },
                    }}
                    control={
                        <Checkbox
                            size="small"
                            checked={selectedAvailability.includes(key)}
                            onChange={() => handleAvailabilityChange(key)}
                        />
                    }
                    label={`${label} (${count})`}
                />
            ))}
        </FormGroup>
    );
}
