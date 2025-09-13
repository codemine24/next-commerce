"use client";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

type TabItem = { value: string, label: string }

interface CustomTabProps {
    tabs: TabItem[];
    value: string;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

export const CustomTab = ({ tabs, value, onChange }: CustomTabProps) => {
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        onChange(event, newValue);
    };

    return (
        <Box width="100%">
            <Box borderBottom={1} borderColor="divider">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((tab, index) => (
                        <Tab key={index} value={tab.value} label={tab.label} sx={{ color: "text.primary", textTransform: 'capitalize' }} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
}