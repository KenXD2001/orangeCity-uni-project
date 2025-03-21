import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="flex h-screen">
            {/* Left Side - Image */}
            <div className="w-1/2 bg-gray-900 flex items-center justify-center">
                <img src="/auth-bg.jpg" alt="Auth" className="w-3/4" />
            </div>

            {/* Right Side - Form */}
            <div className="w-1/2 flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
