import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { OptimizeImage } from "@/components/optimize-image";
import { useAuth } from "@/hooks/use-auth";
import { useLayout } from "@/providers/layout-provider";
import { makeImageUrl } from "@/utils/helper";

export const AdminProfile = () => {
    const { user } = useAuth();
    const { COMPACT } = useLayout();
    return (
        <Box display="flex" alignItems="center" gap={2} p={COMPACT ? 1 : 2} pl={2} borderTop="1px solid" borderColor="divider">
            <OptimizeImage
                alt="Avatar"
                width={COMPACT ? 32 : 40}
                height={COMPACT ? 32 : 40}
                sx={{ borderRadius: "50%", transition: "all 0.15s ease" }}
                src={makeImageUrl(user?.avatar)}
            />

            {!COMPACT && (
                <Box>
                    <Typography variant="body1">{user?.first_name} {user?.last_name}</Typography>
                    <Typography variant="body2">{user?.email}</Typography>
                </Box>
            )}
        </Box>
    );
};