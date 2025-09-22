import Box from "@mui/material/Box";

import { BoxContainer } from "@/components/box-container";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar/nav-bar";

import { UserSidebar } from "./user-sidebar";

export const UserDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <BoxContainer>
        <Box py={2} display="flex" gap={3} alignItems="start">
          <UserSidebar />
          <Box flex={1}>{children}</Box>
        </Box>
      </BoxContainer>
      <Footer />
    </>
  );
};
