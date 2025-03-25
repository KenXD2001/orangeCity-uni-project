import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface ForgotPasswordInputs {
    emailOrPhone: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

function ForgotPassword() {
    const [step, setStep] = useState<"request" | "verify" | "reset">("request");
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors },
        watch,
    } = useForm<ForgotPasswordInputs>({
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const watchFields = watch(["emailOrPhone", "otp", "newPassword", "confirmPassword"]);

    // Step 1: Send OTP
    const handleSendOTP: SubmitHandler<{ emailOrPhone: string }> = () => {
        setOtpSent(true);
        setStep("verify");
        setTimer(30);

        // Timer logic
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

    // Step 2: Verify OTP
    const handleVerifyOTP: SubmitHandler<{ otp: string }> = () => {
        setStep("reset");
    };

    // Step 3: Reset Password
    const handleResetPassword: SubmitHandler<{ newPassword: string; confirmPassword: string }> = () => {
        alert("Password reset successful! 🎉");
        setStep("request");
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

            <form className="space-y-4" onSubmit={handleSubmit(step === "request" ? handleSendOTP : step === "verify" ? handleVerifyOTP : handleResetPassword)}>
                {/* Step 1: Enter Email or Phone */}
                {step === "request" && (
                    <div className="space-y-4">
                        <div className="relative flex items-center">
                            <Icon icon="mdi:email-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className={`pl-10 py-2 ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Email or Phone"
                                {...register("emailOrPhone", {
                                    required: "Email or phone is required",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$|^\d{10}$/,
                                        message: "Enter a valid email or 10-digit phone number",
                                    },
                                    onChange: (e) => setValue("emailOrPhone", e.target.value, { shouldValidate: true }),
                                })}
                                onBlur={() => trigger("emailOrPhone")}
                            />
                        </div>
                        {(watchFields[0] || errors.emailOrPhone) && <p className="text-red-500 text-sm">{errors.emailOrPhone?.message}</p>}

                        <Button className="w-full py-2 font-semibold" type="submit" disabled={otpSent && timer > 0}>
                            {otpSent && timer > 0 ? `Resend OTP (${timer}s)` : "Send OTP"}
                        </Button>
                    </div>
                )}

                {/* Step 2: Verify OTP */}
                {step === "verify" && (
                    <div className="space-y-4">
                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className={`pl-10 py-2 ${errors.otp ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter OTP"
                                {...register("otp", {
                                    required: "OTP is required",
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: "OTP must be 6 digits",
                                    },
                                    onChange: (e) => setValue("otp", e.target.value, { shouldValidate: true }),
                                })}
                                onBlur={() => trigger("otp")}
                            />
                        </div>
                        {(watchFields[1] || errors.otp) && <p className="text-red-500 text-sm">{errors.otp?.message}</p>}

                        <Button className="w-full py-2 font-semibold" type="submit">
                            Verify OTP
                        </Button>
                    </div>
                )}

                {/* Step 3: Reset Password */}
                {step === "reset" && (
                    <div className="space-y-4">
                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className={`pl-10 py-2 ${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    onChange: (e) => setValue("newPassword", e.target.value, { shouldValidate: true }),
                                })}
                                onBlur={() => trigger("newPassword")}
                            />
                            <button
                                type="button"
                                className="absolute right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Icon icon={showPassword ? "ph:eye-slash" : "ph:eye"} width={22} height={22} />
                            </button>
                        </div>
                        {(watchFields[2] || errors.newPassword) && <p className="text-red-500 text-sm">{errors.newPassword?.message}</p>}

                        <div className="relative flex items-center">
                            <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                            <Input
                                className={`pl-10 py-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === watch("newPassword") || "Passwords do not match",
                                })}
                                onBlur={() => trigger("confirmPassword")}
                            />
                        </div>
                        {(watchFields[3] || errors.confirmPassword) && <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>}

                        <Button className="w-full py-2 font-semibold" type="submit">
                            Reset Password
                        </Button>
                    </div>
                )}
            </form>

            <p className="text-sm text-gray-500 text-center">
                <Link to="/auth/login" className="text-blue-600 font-medium">
                    Back to Login?
                </Link>
            </p>
        </div>
    );
}

export default ForgotPassword;
