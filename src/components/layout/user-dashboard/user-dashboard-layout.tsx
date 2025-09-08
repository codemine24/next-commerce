import Grid from "@mui/material/Grid";
import { UserSidebar } from "./user-sidebar";
import { BoxContainer } from "../box-container";
import { Navbar } from "../navbar";

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