import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Footer from './footer';

export const AppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            {children}
            <Footer />
        </AppRouterCacheProvider>
    )
};