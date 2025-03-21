import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
    const navigate = useNavigate();
    const location = useLocation(); // Get current path

    const login = (email: string, password: string) => {
        // Fake authentication (Replace with API call)
        if (email === "admin@demo.com" && password === "password") {
            setUser(email);
            localStorage.setItem("user", email);
            navigate("/dashboard");
        } else {
            alert("Invalid Credentials");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/auth/login");
    };

    useEffect(() => {
        // List of public auth routes that should not trigger redirection
        const publicAuthRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];

        if (!user && !publicAuthRoutes.includes(location.pathname)) {
            navigate("/auth/login");
        }
    }, [user, navigate, location]);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
