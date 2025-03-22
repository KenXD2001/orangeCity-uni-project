import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function ForgotPassword() {
    const [step, setStep] = useState("request"); // Tracks the current step
    const [form, setForm] = useState({ emailOrPhone: "", otp: "", newPassword: "", confirmPassword: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Send OTP Function
    const handleSendOTP = () => {
        if (!form.emailOrPhone) {
            setError("Please enter an email or phone number.");
            return;
        }
        setOtpSent(true);
        setStep("verify"); // Move to OTP verification step
        setTimer(30);
        setError("");

        // Start timer countdown
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // OTP Verification Function
    const handleVerifyOTP = () => {
        if (form.otp.length !== 6) {
            setError("Invalid OTP. Must be 6 digits.");
            return;
        }
        setStep("reset"); // Move to password reset step
        setError("");
    };

    // Reset Password Function
    const handleResetPassword = () => {
        if (!form.newPassword || form.newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        alert("Password reset successful! 🎉");
        setStep("request");
        setForm({ emailOrPhone: "", otp: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="w-96 space-y-6 bg-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold">
                    {step === "request" ? "Forgot Password" : step === "verify" ? "Verify OTP" : "Reset Password"}
                </h2>
                <p className="text-gray-500">
                    {step === "request"
                        ? "Enter your email or phone number to receive an OTP."
                        : step === "verify"
                            ? "Enter the OTP sent to your email/phone."
                            : "Set a new password for your account."}
                </p>
            </div>

            <div className="space-y-4">
                {/* Step 1: Enter Email or Phone */}
                {step === "request" && (
                    <>
                        <div className="relative flex items-center">
                            <Icon icon="mdi:email-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className="pl-10 py-2"
                                placeholder="Email or Phone"
                                value={form.emailOrPhone}
                                onChange={(e) => setForm({ ...form, emailOrPhone: e.target.value })}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button className="w-full py-2 font-semibold" onClick={handleSendOTP} disabled={otpSent && timer > 0}>
                            {otpSent && timer > 0 ? `Resend OTP (${timer}s)` : "Send OTP"}
                        </Button>
                    </>
                )}

                {/* Step 2: Verify OTP */}
                {step === "verify" && (
                    <>
                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className="pl-10 py-2"
                                placeholder="Enter OTP"
                                value={form.otp}
                                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button className="w-full py-2 font-semibold" onClick={handleVerifyOTP}>
                            Verify OTP
                        </Button>
                    </>
                )}

                {/* Step 3: Reset Password */}
                {step === "reset" && (
                    <>
                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className="pl-10 pr-10 py-2"
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Icon icon={showPassword ? "ph:eye-slash" : "ph:eye"} width={22} height={22} />
                            </button>
                        </div>

                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className="pl-10 py-2"
                                type="password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button className="w-full py-2 font-semibold" onClick={handleResetPassword}>
                            Reset Password
                        </Button>
                    </>
                )}

                {step !== "request" && (
                    <p className="text-sm text-gray-500 text-center">
                        <Link to="/auth/login" className="text-blue-600 font-medium">
                            Back to Login
                        </Link>
                    </p>
                )}
            </div>
            <p className="text-sm text-gray-500 text-right">
                <Link to="/auth/login" className="text-blue-600 font-medium">
                    Go to Login?
                </Link>
            </p>
        </div>
    );
}

export default ForgotPassword;
