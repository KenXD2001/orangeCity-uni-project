import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define menu item structure
interface MenuItem {
    name: string;
    path: string;
    icon: string;
}

// Sidebar menu items
const menuItems: MenuItem[] = [
    { path: "/dashboard", name: "Dashboard", icon: "mdi:clipboard-text" },
    { path: "/personal-details", name: "Personal Details", icon: "mdi:account-details" },
    { path: "/qualification-details", name: "Qualification Details", icon: "mdi:school" },
    { path: "/branch-preference", name: "Branch Preference Selection", icon: "mdi:map-marker-radius" },
    { path: "/communication-details", name: "Communication Details", icon: "mdi:message-text" },
    { path: "/documents-upload", name: "Documents Upload", icon: "mdi:file-upload" },
    { path: "/application-preview", name: "Application Preview", icon: "mdi:eye" },
    { path: "/payment-details", name: "Payment Details", icon: "mdi:credit-card" },
    { path: "/application-status", name: "Application Status", icon: "mdi:check-circle" },
];

function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidebarCollapsed") === "true");

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
    }, [collapsed]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className={cn("h-full bg-white shadow-lg border-r border-gray-200 p-4 transition-all", collapsed ? "w-20" : "w-80")}>
            <div className="flex items-center justify-between">
                {!collapsed && <h2 className="text-xl font-bold text-primary">Registration Portal</h2>}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
                    <Icon icon="lucide:sidebar" className="w-6 h-6 text-primary" />
                </Button>
            </div>
            <nav className="mt-6">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.path} item={item} isActive={isActive(item.path)} collapsed={collapsed} />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

// Define props type for SidebarItem
interface SidebarItemProps {
    item: MenuItem;
    isActive: boolean;
    collapsed: boolean;
}

// Reusable Sidebar Item Component
function SidebarItem({ item, isActive, collapsed }: SidebarItemProps) {
    return (
        <li>
            <Link
                to={item.path}
                className={cn(
                    "flex items-center gap-3 py-3 rounded-lg transition-all border",
                    "border-primary text-primary hover:text-white",
                    "hover:bg-primary/80 hover:border-primary",
                    isActive ? "bg-primary text-white" : "bg-transparent",
                    collapsed ? "px-3" : "px-4"
                )}
            >
                <Icon icon={item.icon} className="w-6 h-6 min-w-6 min-h-6" />
                {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
        </li>
    );
}

export default Sidebar;
