"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TABS = [
    { label: "All", value: "" },
    { label: "Admin", value: "admin" },
    { label: "Super Admin", value: "super_admin" },
    { label: "Customer", value: "customer" },
];

export const UserTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("role") || "");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        const params = new URLSearchParams(searchParams);
        if (newValue === "") params.delete("role");
        else params.set("role", newValue);
        router.replace(`?${params.toString()}`);
    };

    return (
        <Box px={2} pt={2}>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
            </Tabs>
        </Box>
    );
}