import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

// Define form input types
interface LoginFormInputs {
    email: string;
    password: string;
}

function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        watch,
    } = useForm<LoginFormInputs>({
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const watchFields = watch(["email", "password"]);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const isValid = await trigger(["email", "password"]);
        if (!isValid) return;

        login(data.email, data.password);
    };

    return (
        <div className="w-96 space-y-6 bg-white">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-500">Sign in to continue</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="mdi:email-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            className={`pl-10 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                                onChange: (e) => {
                                    setValue("email", e.target.value, { shouldValidate: true }); // Live validation
                                },
                            })}
                            onBlur={() => trigger("email")}
                        />
                    </div>
                    {/* Show error if field has value OR if it's a submit validation */}
                    {(watchFields[0] || errors.email) && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Icon icon="mdi:lock-outline" className="absolute left-2 text-gray-400" width={20} height={20} />
                        <Input
                            className={`pl-10 pr-10 py-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                onChange: (e) => {
                                    setValue("password", e.target.value, { shouldValidate: true }); // Live validation
                                },
                            })}
                            onBlur={() => trigger("password")}
                        />
                        <button
                            type="button"
                            className="absolute right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Icon icon={showPassword ? "ph:eye-slash" : "ph:eye"} width={22} height={22} />
                        </button>
                    </div>
                    {(watchFields[1] || errors.password) && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
                </div>

                {/* Forgot Password Link */}
                <p className="text-sm text-gray-500 text-right">
                    <Link to="/auth/forgot-password" className="text-blue-600 font-medium">
                        Forgot Password?
                    </Link>
                </p>

                {/* Login Button */}
                <Button
                    type="submit"
                    className="w-full py-2 font-semibold"
                >
                    Login
                </Button>

                {/* Signup Link */}
                <p className="text-sm text-gray-500 text-center">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-blue-600 font-medium">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
