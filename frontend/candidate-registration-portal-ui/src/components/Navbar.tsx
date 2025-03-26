import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mapping paths to breadcrumb names
const breadcrumbMap: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/personal-details": "Personal Details",
    "/qualification-details": "Qualification Details",
    "/branch-preference": "Branch Preference Selection",
    "/communication-details": "Communication Details",
    "/documents-upload": "Documents Upload",
    "/application-preview": "Application Preview",
    "/payment-details": "Payment Details",
    "/application-status": "Application Status",
};

function Navbar() {
    const { logout } = useAuth();
    const location = useLocation();

    // Get the current page name from the path
    const currentPage = breadcrumbMap[location.pathname] || "Unknown Page";

    return (
        <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
                <BreadcrumbList className="flex items-center">
                    <BreadcrumbItem>
                        <span className="text-gray-500">Home</span>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <span className="text-gray-500">Registration</span>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Logout Button */}
            <Button onClick={logout}>
                Logout
            </Button>
        </nav>
    );
}

export default Navbar;
