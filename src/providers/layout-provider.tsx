"use client";

import { useState, createContext, PropsWithChildren, useContext } from "react";

const TOP_HEADER_AREA = 70;

// ==============================================================
interface ContextProps {
    COMPACT: number;
    TOP_HEADER_AREA: number;
    sidebarCompact: boolean;
    isSidebarHover: boolean;
    showMobileSideBar: boolean;
    handleOpenMobileSidebar: () => void;
    handleCloseMobileSidebar: () => void;
    handleSidebarCompactToggle: () => void;
    handleSidebarHover: (value: boolean) => void;
}
// ==============================================================

const LayoutContext = createContext({} as ContextProps);

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: PropsWithChildren) => {
    const [isSidebarHover, setIsSidebarHover] = useState(false);
    const [sidebarCompact, setSidebarCompact] = useState(false);
    const [showMobileSideBar, setShowMobileSideBar] = useState(false);

    // HANDLE SIDE BAR TOGGLE FOR LARGE DEVICE
    const handleSidebarCompactToggle = () => setSidebarCompact(!sidebarCompact);

    // HANDLE SIDE BAR OPEN FOR SMALL DEVICE
    const handleOpenMobileSidebar = () => setShowMobileSideBar(true);

    // HANDLE SIDE BAR CLOSE FOR SMALL DEVICE
    const handleCloseMobileSidebar = () => setShowMobileSideBar(false);

    // HANDLE DASHBOARD SIDE BAR HOVER
    const handleSidebarHover = (value: boolean) => setIsSidebarHover(value);

    const COMPACT = sidebarCompact && !isSidebarHover ? 1 : 0;

    return (
        <LayoutContext.Provider
            value={{
                COMPACT,
                TOP_HEADER_AREA,
                sidebarCompact,
                isSidebarHover,
                showMobileSideBar,
                handleSidebarHover,
                handleOpenMobileSidebar,
                handleCloseMobileSidebar,
                handleSidebarCompactToggle
            }}>
            {children}
        </LayoutContext.Provider>
    );
};