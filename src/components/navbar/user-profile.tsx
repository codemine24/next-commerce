import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { OptimizeImage } from "@/components/optimize-image";
import { useAuth } from "@/hooks/use-auth";
import { ChevronDownIcon } from "@/icons/chevron-down";
import { LogoutIcon } from "@/icons/logout";
import { UserIcon } from "@/icons/user";
import { toast } from "@/lib/toast-store";
import { makeImageUrl } from "@/utils/helper";

export const UserProfile = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    toast.error("User logged out");
    router.replace("/");
  };

  return (
    <>
      <Box
        component="button"
        display="flex"
        alignItems="center"
        gap={2}
        px={2}
        height="100%"
        sx={{
          cursor: "pointer",
          position: "relative",
          border: "none",
          background: "none",
        }}
        onClick={handleClick}
      >
        <OptimizeImage
          src={makeImageUrl(user?.avatar)}
          alt={user?.first_name || "User"}
          width={30}
          height={30}
          sx={{ borderRadius: "50%" }}
        />
        <Typography
          variant="body2"
          maxWidth={75}
          overflow="hidden"
          textOverflow="ellipsis"
          noWrap
        >
          {user?.first_name} {user?.last_name}
        </Typography>
        <ChevronDownIcon fontSize="small" />
      </Box>

      {/* User Profile Menu */}
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box width={300}>
          <Box p={2}>
            <Typography fontWeight={600}>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" flexDirection="column" gap={0.5}>
            <Button
              startIcon={<UserIcon />}
              size="small"
              variant="text"
              color="inherit"
              sx={{ justifyContent: "flex-start" }}
              fullWidth
              onClick={() => router.push(user?.role === "ADMIN" ? "/admin" : "/user")}
              
            >
               <Box component="span" sx={{}}> Account</Box>
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              size="small"
              variant="text"
              color="error"
              sx={{ justifyContent: "flex-start" }}
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};