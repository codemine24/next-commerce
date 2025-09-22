import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import { alpha, Theme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

import { ChevronDownIcon } from "@/icons/chevron-down";
import { useLayout } from "@/providers/layout-provider";
import { theme } from "@/theme";

interface Active {
    active: number;
}
interface Compact {
    compact: number;
}

// Sidebar wrapper
export const SidebarWrapper = ({ compact, ...props }: Compact & any) => (
    <Box
        {...props}
        sx={(theme) => ({
            width: 280,
            height: "100vh",
            position: "fixed",
            transition: "all .2s ease",
            zIndex: theme.zIndex.drawer,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[900],
            ...(compact && {
                width: 60,
                "&:hover": { width: 280 }
            })
        })}
    />
);

// Nav item button
export const NavItemButton = ({ active, ...props }: Active & any) => (
    <ButtonBase
        {...props}
        sx={(theme) => ({
            height: 44,
            width: "100%",
            borderRadius: 1,
            mb: 0.5,
            px: "12px",
            pl: "16px",
            justifyContent: "flex-start",
            transition: "all 0.15s ease",
            "&:hover": {
                color: "primary.main",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
            ...(active && {
                color: theme.palette.primary.main,
                "& .MuiSvgIcon-root .secondary": {
                    color: theme.palette.primary.main,
                    opacity: 1
                }
            }),
            ...(props.sx || {})
        })}
    />
);

// Label
export const ListLabel = ({ compact, ...props }: Compact & any) => (
    <Box
        component="p"
        {...props}
        sx={{
            fontWeight: 600,
            fontSize: "12px",
            mt: "20px",
            ml: "15px",
            mb: "10px",
            textTransform: "uppercase",
            transition: "all 0.15s ease",
            ...(compact && { opacity: 0, width: 0 }),
            ...(props.sx || {})
        }}
    />
);

// Icon wrapper
export const ListIconWrapper = (props: any) => (
    <Box
        {...props}
        sx={{
            width: 22,
            height: 22,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            mr: "0.8rem",
            justifyContent: "center",
            "& svg": {
                width: "100%",
                height: "100%",
            },
            ...(props.sx || {})
        }}
    />
);

// External link
export const ExternalLink = (props: any) => (
    <Box
        component="a"
        {...props}
        sx={{
            overflow: "hidden",
            whiteSpace: "pre",
            mb: "8px",
            textDecoration: "none",
            ...(props.sx || {})
        }}
    />
);

// Styled text
export const StyledText = ({ compact, ...props }: Compact & any) => (
    <Box
        component="span"
        {...props}
        sx={{
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
            ...(compact && { opacity: 0, width: 0 }),
            ...(props.sx || {})
        }}
    />
);

// Bullet icon
export const BulletIcon = ({ active, ...props }: Active & any) => (
    <Box
        {...props}
        sx={(theme: Theme) => ({
            width: 3,
            height: 3,
            ml: "10px",
            overflow: "hidden",
            borderRadius: "50%",
            mr: "1.3rem",
            background: active ? theme.palette.primary.main : theme.palette.common.white,
            boxShadow: active
                ? `0px 0px 0px 4px ${alpha(theme.palette.primary.main, 0.2)}`
                : "none",
            ...(props.sx || {})
        })}
    />
);

// Badge value
export const BadgeValue = ({ compact, ...props }: Compact & any) => (
    <Box
        {...props}
        sx={{
            px: "8px",
            py: "1px",
            overflow: "hidden",
            borderRadius: "300px",
            display: compact ? "none" : "unset",
            ...(props.sx || {})
        }}
    />
);

const NavExpandRoot = (props: any) => (
    <Box
        {...props}
        sx={{
            "& .expansion-panel": {
                overflow: "hidden",
                "& .expansion-panel": { paddingLeft: 8 },
            }
        }}
    />
);

interface Props extends PropsWithChildren {
    item: any;
}

export const SidebarAccordion = ({ item, children }: Props) => {
    const { name, icon, iconText, badge } = item || {};

    const { COMPACT } = useLayout();
    const pathname = usePathname();
    const [hasActive, setHasActive] = useState(0);
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = () => setCollapsed((state) => !state);

    const find = item?.children?.find((li: any) => li.path === pathname);

    useEffect(() => {
        if (find) {
            setCollapsed(true);
            setHasActive(1);
        }

        if (COMPACT) {
            setCollapsed(false);
        }

        return () => {
            setCollapsed(false);
            setHasActive(0);
        };
    }, [find, COMPACT]);

    return (
        <NavExpandRoot className="subMenu">
            <NavItemButton active={hasActive} onClick={handleClick} sx={{ justifyContent: "space-between", borderRadius: 0 }}>
                <Box display="flex" alignItems="center">
                    {icon ? (
                        <ListIconWrapper>
                            {icon}
                        </ListIconWrapper>
                    ) : null}

                    {iconText ? <BulletIcon active={hasActive} /> : null}

                    <StyledText compact={COMPACT}>{name}</StyledText>
                </Box>

                {badge ? <BadgeValue compact={COMPACT}>{badge.value}</BadgeValue> : null}

                <ChevronDownIcon
                    fontSize="small"
                    sx={{
                        transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
                        ...(COMPACT && { display: "none", width: 0 }),
                        ...(collapsed && theme.direction === "rtl" && {
                            transform: "rotate(180deg)"
                        })
                    }} />
            </NavItemButton>

            <Collapse in={collapsed} unmountOnExit>
                <div className="expansion-panel">{children}</div>
            </Collapse>
        </NavExpandRoot>
    );
}