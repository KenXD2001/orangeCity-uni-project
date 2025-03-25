import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoutes = () => {
    const { user } = useAuth();

    return user ? (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </AppLayout>
    ) : (
        <Navigate to="/auth/login" replace />
    );
};

export default PrivateRoutes;
