import Grid from "@mui/material/Grid";

import { BoxContainer } from "@/components/box-container";
import { Navbar } from "@/components/navbar/nav-bar";

import { UserSidebar } from "./user-sidebar";

export const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <BoxContainer sx={{ mt: 2 }}>
                <Grid container>
                    <UserSidebar />
                    <Grid size={{ xs: 12, md: 9 }}>
                        {children}
                    </Grid>
                </Grid>
            </BoxContainer>
        </>
    )
}