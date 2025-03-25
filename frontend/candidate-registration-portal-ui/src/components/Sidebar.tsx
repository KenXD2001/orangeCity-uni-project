import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
    }, [collapsed]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className={cn("h-full bg-gray-900 text-white p-4 transition-all", collapsed ? "w-20" : "w-64")}>
            <div className="flex items-center justify-between">
                {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
                    <Menu className="w-6 h-6" />
                </Button>
            </div>
            <nav className="mt-6">
                <ul>
                    <li className="mb-2">
                        <Link to="/dashboard" className={cn("flex items-center gap-2 p-2 rounded", isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700")}>
                            <Home className="w-6 h-6" /> {!collapsed && "Dashboard"}
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/profile" className={cn("flex items-center gap-2 p-2 rounded", isActive("/profile") ? "bg-gray-700" : "hover:bg-gray-700")}>
                            <User className="w-6 h-6" /> {!collapsed && "Profile"}
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
