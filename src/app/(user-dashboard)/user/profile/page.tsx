import Box from "@mui/material/Box";

import { getProfile } from "@/actions/user";

import { UpdateProfileForm } from "./_components/profile-form";

export default async function Profile() {
  const profileData = await getProfile();
  return (
    <Box>
      <UpdateProfileForm profileData={profileData?.data} />
    </Box>
  );
}
