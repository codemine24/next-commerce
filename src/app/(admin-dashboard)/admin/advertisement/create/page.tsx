import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CreateAdvertise } from "./_components/create-advertise";

const CreateAdvertisePage = () => {
    return (
        <Box pb={10}>
            <Typography variant="h3" mb={4}>Create Advertise</Typography>
            <CreateAdvertise />
        </Box>
    );
}

export default CreateAdvertisePage;