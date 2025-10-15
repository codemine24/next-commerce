"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";

const tabItem = [
    { label: "Hero slider", value: "hero-slider" },
    { label: "Shop now banner", value: "shop-now-banner" },
]

export const AdvertisementTab = () => {
    const [value, setValue] = useState("hero-slider");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                {tabItem.map((item) => (
                    <Tab key={item.value} label={item.label} value={item.value} />
                ))}
            </Tabs>
        </Box>
    );
};