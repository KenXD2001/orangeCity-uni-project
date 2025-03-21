import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Login() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        login(form.email, form.password);
    };

    return (
        <div className="w-96 space-y-6 bg-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-500">Sign in to continue</p>
            </div>

            <div className="space-y-4">
                <div className="relative flex items-center">
                    <Icon icon="mdi:email-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                    <Input
                        className="pl-10 py-2"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <div className="relative flex items-center">
                        <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            className="pl-10 pr-10 py-2"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Icon icon={showPassword ? "ph:eye-slash" : "ph:eye"} width={22} height={22} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 text-right">
                        <Link to="/auth/forgot-password" className="text-blue-600 font-medium">
                            Forgot Password?
                        </Link>
                    </p>
                </div>

                <Button className="w-full py-2 font-semibold" onClick={handleLogin}>
                    Login
                </Button>

                <p className="text-sm text-gray-500 text-center">
                    Don't have an account? <Link to="/auth/register" className="text-blue-600 font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;