import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function Login() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = () => {
        login(form.email, form.password);
    };

    return (
        <div className="w-96 space-y-4">
            <h2 className="text-2xl font-bold">Login</h2>
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button className="w-full" onClick={handleLogin}>
                Login
            </Button>
            <p className="text-sm text-gray-500">
                Don't have an account? <Link to="/auth/register" className="text-blue-600">Sign up</Link>
            </p>
        </div>
    );
}

export default Login;
