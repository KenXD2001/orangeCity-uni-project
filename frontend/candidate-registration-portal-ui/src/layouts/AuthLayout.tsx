import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function AuthLayout() {
    return (
        <motion.div
            className="flex h-screen"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            {/* Left Side - Image */}
            <div className="w-1/2 bg-gray-900 flex items-center justify-center">
                <img src="/auth-bg.jpg" alt="Auth" className="w-3/4" />
            </div>

            {/* Right Side - Form */}
            <div className="w-1/2 flex items-center justify-center">
                <Outlet />
            </div>
        </motion.div>
    );
}

export default AuthLayout;
