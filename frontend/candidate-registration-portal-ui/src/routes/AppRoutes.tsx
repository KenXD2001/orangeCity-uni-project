import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthLayout from "@/layouts/AuthLayout";

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Auth Routes */}
                <Route path="/auth/*" element={<AuthLayout />}>
                    <Route path="*" element={<AuthRoutes />} />
                </Route>

                {/* Private Routes for Logged-in Users */}
                <Route path="/*" element={<PrivateRoutes />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
