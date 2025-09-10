import Box from "@mui/material/Box";

import { BoxContainer } from "@/components/box-container";
import { Navbar } from "@/components/navbar/nav-bar";

import { UserSidebar } from "./user-sidebar";

export const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <BoxContainer sx={{ mt: 2 }}>
                <Box display="flex" gap={2}>
                    <UserSidebar />
                    <Box flex={1}>
                        {children}
                    </Box>
                </Box>
            </BoxContainer>
        </>
    )
}