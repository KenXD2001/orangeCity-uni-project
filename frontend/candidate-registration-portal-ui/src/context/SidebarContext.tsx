// src/context/SidebarContext.tsx
import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext; // ✅ Export the context only
