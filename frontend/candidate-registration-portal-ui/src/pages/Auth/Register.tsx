import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// Define form input types
interface RegisterFormInputs {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
}

function Register() {
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

    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [mobileVerified, setMobileVerified] = useState(false);
    const [emailTimer, setEmailTimer] = useState(0);
    const [mobileTimer, setMobileTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        watch,
    } = useForm<RegisterFormInputs>({
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const watchFields = watch(["name", "email", "mobile", "password", "confirmPassword"]);

    const sendOtp = (type: "email" | "mobile") => {
        if (type === "email" && !form.email) {
            alert("Enter a valid email!");
            return;
        } else if (type === "mobile" && !form.mobile) {
            alert("Enter a valid mobile number!");
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
        if (type === "email" && form.emailOtp !== "1234") {
            alert("Invalid Email OTP!");
        } else if (type === "mobile" && form.mobileOtp !== "5678") {
            alert("Invalid Mobile OTP!");
        } else {
            setEmailVerified(type === "email");
            setMobileVerified(type === "mobile");
        }
    };

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        const isValid = await trigger(["name", "email", "mobile", "password", "confirmPassword"]);
        if (!isValid) return;

        console.log("User registered:", data); // Use data before redirecting
        navigate("/login");
    };

    return (
        <div className="w-96 space-y-4 bg-white">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold">Create an Account</h2>
                <p className="text-gray-500">Sign in to continue</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="ph:user" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            placeholder="Full Name"
                            className={`pl-8 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            {...register("name", {
                                required: "Full Name is required",
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Invalid Full Name (only letters and spaces allowed)",
                                },
                                onChange: (e) => {
                                    setValue("name", e.target.value, { shouldValidate: true });
                                },
                            })}
                            onBlur={() => trigger("name")}
                        />
                    </div>
                    {(watchFields[0] || errors.name) && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                </div>

                {/* Email with OTP */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="ph:envelope-simple" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            placeholder="Email"
                            className={`pl-8 py-2 pr-26 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid Email",
                                },
                                onChange: (e) => {
                                    setValue("email", e.target.value, { shouldValidate: true });
                                },
                            })}
                            onBlur={() => trigger("email")}
                        />
                        <Button className="absolute right-1" size="sm" onClick={() => sendOtp("email")} disabled={emailTimer > 0}>
                            {emailOtpSent ? (emailTimer > 0 ? `Resend in ${emailTimer}s` : "Resend OTP") : "Send OTP"}
                        </Button>
                    </div>
                    {(watchFields[0] || errors.email) && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                </div>

                {/* Email OTP Verification */}
                {emailOtpSent && (
                    <div className="relative flex items-center">
                        <Input
                            placeholder="Enter Email OTP"
                            className="pr-20"
                            value={form.emailOtp}
                            onChange={(e) => setForm((prev) => ({ ...prev, emailOtp: e.target.value }))}
                            disabled={emailVerified}
                        />
                        <Button className="absolute right-1" size="sm" onClick={() => verifyOtp("email")} disabled={emailVerified}>
                            {emailVerified ? "Verified ✅" : "Verify"}
                        </Button>
                    </div>
                )}

                {/* Mobile with OTP */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="ph:phone" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            placeholder="Mobile Number"
                            className={`pl-8 py-2 pr-26 ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                            {...register("mobile", {
                                required: "Mobile Number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Invalid Mobile Number (must be 10 digits)",
                                },
                                onChange: (e) => {
                                    setValue("mobile", e.target.value, { shouldValidate: true });
                                },
                            })}
                            onBlur={() => trigger("mobile")}
                        />
                        <Button className="absolute right-1" size="sm" onClick={() => sendOtp("mobile")} disabled={mobileTimer > 0}>
                            {mobileOtpSent ? (mobileTimer > 0 ? `Resend in ${mobileTimer}s` : "Resend OTP") : "Send OTP"}
                        </Button>
                    </div>
                    {(watchFields[0] || errors.mobile) && <p className="text-red-500 text-sm">{errors.mobile?.message}</p>}
                </div>

                {/* Mobile OTP Verification */}
                {mobileOtpSent && (
                    <div className="relative flex items-center">
                        <Input placeholder="Enter Mobile OTP" value={form.mobileOtp} onChange={(e) => setForm({ ...form, mobileOtp: e.target.value })} disabled={mobileVerified} className="pr-20" />
                        <Button className="absolute right-1" size="sm" onClick={() => verifyOtp("mobile")} disabled={mobileVerified}>
                            {mobileVerified ? "Verified ✅" : "Verify"}
                        </Button>
                    </div>
                )}

                {/* Password Field with Eye Button */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="ph:password" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className={`pl-8 py-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be at least 8 characters with letters and numbers",
                                },
                                onChange: (e) => {
                                    setValue("password", e.target.value, { shouldValidate: true });
                                },
                            })}
                            onBlur={() => trigger("password")}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="text-gray-500 text-lg" />
                        </button>
                    </div>
                    {(watchFields[0] || errors.password) && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
                </div>

                {/* Confirm Password Field with Eye Button */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="ph:password" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`pl-8 py-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid Confirm Password",
                                },
                                onChange: (e) => {
                                    setValue("confirmPassword", e.target.value, { shouldValidate: true });
                                },
                            })}
                            onBlur={() => trigger("confirmPassword")}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} className="text-gray-500 text-lg" />
                        </button>
                    </div>
                    {(watchFields[0] || errors.confirmPassword) && <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>}
                </div>

                {/* Register Button */}
                <Button
                    type="submit"
                    className="w-full py-2 font-semibold"
                >
                    Create Account
                </Button>

                {/* Login Button */}
                <p className="text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-blue-600 font-medium">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
