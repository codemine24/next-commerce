import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TABS = [
    { label: "All", value: "all" },
    { label: "Images", value: "images" },
    { label: "Videos", value: "videos" },
    { label: "Documents", value: "documents" },
    { label: "Audios", value: "audios" },
];

export const MediaTabs = () => {
    return (
        <Box px={2} pt={2}>
            <Tabs
                value={TABS[0].value}
                onChange={(event, newValue) => console.log(newValue)}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
            </Tabs>
        </Box>
    );
}