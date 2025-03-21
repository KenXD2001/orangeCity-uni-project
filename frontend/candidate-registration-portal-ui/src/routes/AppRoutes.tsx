import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthLayout from "@/layouts/AuthLayout";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path="/auth/*" element={<AuthLayout />}>
                <Route path="*" element={<AuthRoutes />} />
            </Route>

            {/* Private Routes for Logged-in Users */}
            <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
    );
};

export default AppRoutes;
