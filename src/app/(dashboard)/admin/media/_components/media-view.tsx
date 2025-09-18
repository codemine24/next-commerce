import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { MediaFilter } from "./media-filter";

export default function MediaView() {
    return (
        <Box>
            <Typography variant="h4" sx={{ my: 4 }}>Media</Typography>
            <MediaFilter />
        </Box>
    );
}