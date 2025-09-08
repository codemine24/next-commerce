"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonBase, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useLayout } from "@/providers/layout-provider";
import { ADMIN_NAVIGATION } from "./admin-navigation";
import { SidebarAccordion } from "./sidebar-accordion";
import { OverlayScrollbar } from "./overlay-scrollbar";


export const MultiLevelMenu = () => {
    const pathname = usePathname();
    const theme = useTheme();
    const { COMPACT, TOP_HEADER_AREA, handleCloseMobileSidebar } = useLayout();

    // HANDLE ACTIVE CURRENT PAGE
    const activeRoute = (path: string) => (pathname === path ? 1 : 0);

    const renderLevels = (data: any) => {
        return data.map((item: any, index: number) => {
            if (item.type === "label") {
                return (
                    <p
                        key={index}
                        style={{
                            fontWeight: 600,
                            fontSize: "12px",
                            marginTop: "20px",
                            marginLeft: "15px",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            transition: "all 0.15s ease",
                            ...(COMPACT && { opacity: 0, width: 0 })
                        }}
                    >
                        {item.label}
                    </p>
                );
            }

            if (item.children) {
                return (
                    <SidebarAccordion key={index} item={item}>
                        {renderLevels(item.children)}
                    </SidebarAccordion>
                );
            }

            if (item.type === "extLink") {
                return (
                    <Link key={index} href={item.path} passHref legacyBehavior>
                        <ButtonBase
                            sx={(theme) => ({
                                height: 44,
                                width: "100%",
                                borderRadius: 1,
                                mb: 0.5,
                                px: "12px",
                                pl: "16px",
                                justifyContent: "flex-start",
                                transition: "all 0.15s ease",
                                ...(activeRoute(item.path) && {
                                    color: theme.palette.primary.main,
                                    backgroundColor: alpha(theme.palette.grey[800], 0.6),
                                    "& .MuiSvgIcon-root .secondary": {
                                        color: theme.palette.primary.main,
                                        opacity: 1,
                                    },
                                }),
                            })}
                            onClick={handleCloseMobileSidebar}
                        >
                            {item?.icon ? (
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        flexShrink: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "0.8rem",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: 3,
                                        height: 3,
                                        marginLeft: "10px",
                                        overflow: "hidden",
                                        borderRadius: "50%",
                                        marginRight: "1.3rem",
                                        background: activeRoute(item.path)
                                            ? theme.palette.primary.main
                                            : theme.palette.common.white,
                                        boxShadow: activeRoute(item.path)
                                            ? `0px 0px 0px 4px ${alpha(theme.palette.primary.main, 0.2)}`
                                            : "none",
                                    }}
                                />
                            )}
                            <span
                                style={{
                                    whiteSpace: "nowrap",
                                    transition: "all 0.15s ease",
                                    ...(COMPACT && { opacity: 0, width: 0 }),
                                }}
                            >
                                {item.name}
                            </span>
                            {item.badge ? (
                                <div
                                    style={{
                                        padding: "1px 8px",
                                        overflow: "hidden",
                                        borderRadius: "300px",
                                        display: COMPACT ? "none" : "unset",
                                    }}
                                >
                                    {item.badge.value}
                                </div>
                            ) : null}
                        </ButtonBase>
                    </Link>

                );
            }

            return (
                <Link key={index} href={item.path} passHref>
                    <ButtonBase
                        sx={(theme) => ({
                            height: 44,
                            width: "100%",
                            borderRadius: 1,
                            mb: 0.5,
                            px: "12px",
                            pl: "16px",
                            justifyContent: "flex-start",
                            transition: "all 0.15s ease",
                            ...(activeRoute(item.path) && {
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.grey[800], 0.6),
                                "& .MuiSvgIcon-root .secondary": {
                                    color: theme.palette.primary.main,
                                    opacity: 1
                                }
                            })
                        })}
                        onClick={handleCloseMobileSidebar}
                    >
                        {item?.icon ? (
                            <div
                                style={{
                                    width: 22,
                                    height: 22,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "0.8rem",
                                    justifyContent: "center"
                                }}
                            >
                                {item.icon}
                            </div>
                        ) : (
                            <div
                                style={{
                                    width: 3,
                                    height: 3,
                                    marginLeft: "10px",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    marginRight: "1.3rem",
                                    background: activeRoute(item.path)
                                        ? theme.palette.primary.main
                                        : theme.palette.common.white,
                                    boxShadow: activeRoute(item.path)
                                        ? `0px 0px 0px 4px ${alpha(theme.palette.primary.main, 0.2)}`
                                        : "none"
                                }}
                            />
                        )}
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                transition: "all 0.15s ease",
                                ...(COMPACT && { opacity: 0, width: 0 })
                            }}
                        >
                            {item.name}
                        </span>
                        {item.badge ? (
                            <div
                                style={{
                                    padding: "1px 8px",
                                    overflow: "hidden",
                                    borderRadius: "300px",
                                    display: COMPACT ? "none" : "unset"
                                }}
                            >
                                {item.badge.value}
                            </div>
                        ) : null}
                    </ButtonBase>
                </Link>
            );
        });
    };

    return (
        <OverlayScrollbar
            sx={{
                px: 2,
                overflowX: "hidden",
                maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
                bgcolor: "primary.dark",
                color: "primary.contrastText"
            }}
        >
            {renderLevels(ADMIN_NAVIGATION)}
        </OverlayScrollbar>
    );
}