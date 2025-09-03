import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Footer from './footer';
import { AppProvider } from '@/providers/app-provider';
import { Navbar } from '@/components/layout/navbar';
import Box from '@mui/material/Box';

export const AppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            <AppProvider>
                <Navbar />
                <Box pt="50px" minHeight="100svh">
                    {children}
                </Box>
                <Footer />
            </AppProvider>
        </AppRouterCacheProvider>
    )
};