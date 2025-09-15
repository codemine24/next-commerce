import Box from "@mui/material/Box";

import { BoxContainer } from "@/components/box-container";
import { Navbar } from "@/components/navbar/nav-bar";

import Footer from "../footer";

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
