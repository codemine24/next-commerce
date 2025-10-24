import Box from '@mui/material/Box';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { Navbar } from '@/components/navbar/nav-bar';
import { AppProvider } from '@/providers/app-provider';

import Footer from './footer';
import { TopNavbar } from './navbar/top-navbar';

export const AppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            <AppProvider>
                <TopNavbar />
                <Navbar />
                <Box minHeight="calc(100svh - 50px)">{children}</Box>
                <Footer />
            </AppProvider>
        </AppRouterCacheProvider>
    )
};