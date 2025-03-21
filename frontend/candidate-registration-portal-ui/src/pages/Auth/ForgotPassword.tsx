import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            alert("Password reset link sent to your email!");
            navigate("/auth/login");
        }, 2000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="text-center">
                    <p>
                        Remember your password?{" "}
                        <a href="/auth/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ForgotPassword;
