import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoutes = () => {
    const { user } = useAuth();

    return user ? (
        <AppLayout>
            <Outlet />
        </AppLayout>
    ) : (
        <Navigate to="/auth/login" replace />
    );
};

export default PrivateRoutes;
