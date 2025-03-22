import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        emailOtp: "",
        mobile: "",
        mobileOtp: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);
    const [emailTimer, setEmailTimer] = useState(0);
    const [mobileTimer, setMobileTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const sendOtp = (type: "email" | "mobile") => {
        if (type === "email" && !form.email) {
            setError("Enter a valid email!");
            return;
        } else if (type === "mobile" && !form.mobile) {
            setError("Enter a valid mobile number!");
            return;
        }

        if (type === "email") {
            setEmailOtpSent(true);
            setEmailTimer(30);

            const emailInterval = setInterval(() => {
                setEmailTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(emailInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setMobileOtpSent(true);
            setMobileTimer(30);

            const mobileInterval = setInterval(() => {
                setMobileTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(mobileInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };


    const verifyOtp = (type: "email" | "mobile") => {
        if (type === "email" && form.emailOtp === "1234") {
            setEmailVerified(true);
        } else if (type === "mobile" && form.mobileOtp === "5678") {
            setMobileVerified(true);
        } else {
            setError("Invalid OTP!");
        }
    };

    const handleRegister = () => {
        if (!emailVerified || !mobileVerified) {
            setError("Verify both email and mobile before registering!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        login(form.email, form.password);
        navigate("/dashboard");
    };

    return (
        <div className="w-96 space-y-4 bg-white">
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

            {/* Email with OTP */}
            <div className="relative flex items-center">
                <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="pr-24" />
                <Button className="absolute right-1" size="sm" onClick={() => sendOtp("email")} disabled={emailTimer > 0}>
                    {emailOtpSent ? (emailTimer > 0 ? `Resend in ${emailTimer}s` : "Resend OTP") : "Send OTP"}
                </Button>
            </div>

            {emailOtpSent && (
                <div className="relative flex items-center">
                    <Input placeholder="Enter Email OTP" value={form.emailOtp} onChange={(e) => setForm({ ...form, emailOtp: e.target.value })} disabled={emailVerified} className="pr-20" />
                    <Button className="absolute right-1" size="sm" onClick={() => verifyOtp("email")} disabled={emailVerified}>
                        {emailVerified ? "Verified ✅" : "Verify"}
                    </Button>
                </div>
            )}

            {/* Mobile with OTP */}
            <div className="relative flex items-center">
                <Input placeholder="Mobile Number" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="pr-24" />
                <Button className="absolute right-1" size="sm" onClick={() => sendOtp("mobile")} disabled={mobileTimer > 0}>
                    {mobileOtpSent ? (mobileTimer > 0 ? `Resend in ${mobileTimer}s` : "Resend OTP") : "Send OTP"}
                </Button>
            </div>

            {mobileOtpSent && (
                <div className="relative flex items-center">
                    <Input placeholder="Enter Mobile OTP" value={form.mobileOtp} onChange={(e) => setForm({ ...form, mobileOtp: e.target.value })} disabled={mobileVerified} className="pr-20" />
                    <Button className="absolute right-1" size="sm" onClick={() => verifyOtp("mobile")} disabled={mobileVerified}>
                        {mobileVerified ? "Verified ✅" : "Verify"}
                    </Button>
                </div>
            )}

            {/* Password Field with Eye Button */}
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="text-gray-500 text-lg" />
                </button>
            </div>

            {/* Confirm Password Field with Eye Button */}
            <div className="relative">
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} className="text-gray-500 text-lg" />
                </button>
            </div>

            <Button className="w-full font-semibold py-2" onClick={handleRegister} disabled={!emailVerified || !mobileVerified}>
                Sign Up
            </Button>

            <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-600 font-medium">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;
