"use client";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

type TabItem = { value: string; label: string };

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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            [`& .${tabClasses.selected}`]: {
              color: "#08996B",
              bgcolor: alpha("#08996B", 0.1),
              borderColor: "red",
            },
            [`& .${tabClasses.root}`]: {
              flexGrow: 1,
            },
            [`& .${tabsClasses.indicator}`]: {
              bgcolor: "#08996B",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              value={tab.value}
              label={tab.label}
              sx={{
                color: "#A4B2AE",
                textTransform: "capitalize",
                fontSize: 16,
                fontWeight: 400,
                transition: "all 0.3s ease",
                "&:hover": { color: "#08996B" },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
