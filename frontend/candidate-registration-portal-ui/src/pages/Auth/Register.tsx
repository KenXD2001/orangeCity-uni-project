import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const { login } = useAuth(); // Simulating login after registration
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleRegister = () => {
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Fake Registration Logic (Replace with API call)
        if (form.email && form.password) {
            login(form.email, form.password); // Simulating auto-login after registration
            navigate("/dashboard"); // Redirect to dashboard
        } else {
            setError("All fields are required!");
        }
    };

    return (
        <div className="w-96 space-y-4">
            <h2 className="text-2xl font-bold">Create an Account</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />

            <Button className="w-full" onClick={handleRegister}>
                Sign Up
            </Button>

            <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-600">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;
