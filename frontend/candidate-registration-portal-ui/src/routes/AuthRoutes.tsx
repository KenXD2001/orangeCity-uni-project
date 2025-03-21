import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
};

export default AuthRoutes;
