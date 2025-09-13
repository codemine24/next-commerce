import Grid from "@mui/material/Grid";
import { UserSidebar } from "./user-sidebar";
import { Navbar } from "@/components/navbar/nav-bar";
import { BoxContainer } from "@/components/box-container";

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