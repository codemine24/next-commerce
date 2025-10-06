import Box from "@mui/material/Box";

import { UpdateProfileForm } from "./_components/profile-form";


export default async function Profile() {

    // const profileData = await getUserProfile();
    return (
        <Box>
            <UpdateProfileForm />
        </Box>
    );
}