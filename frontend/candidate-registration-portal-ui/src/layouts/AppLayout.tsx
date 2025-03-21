import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface AppLayoutProps {
    children?: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="p-6">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
