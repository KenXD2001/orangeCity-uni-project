import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Dashboard = () => {
    const navigate = useNavigate();
    const progress = 40; // Example progress percentage, can be dynamic

    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 px-6 py-8 rounded-2xl">
            {/* Welcome Section */}
            <Card className="max-w-3xl w-full shadow-lg border border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Welcome, Ashwin Bhardwaj!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                    <p className="text-lg">
                        Thank you for registering! Follow the steps below to complete your application smoothly.
                    </p>

                    {/* Progress Tracker */}
                    <div>
                        <p className="text-sm font-medium text-gray-600">Your Application Progress</p>
                        <Progress value={progress} className="h-2 mt-2" />
                        <p className="text-sm text-gray-500">{progress}% Completed</p>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => navigate("/documents-upload")}
                        >
                            <Icon icon="mdi:file-upload" className="w-5 h-5" />
                            Upload Documents
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => navigate("/application-status")}
                        >
                            <Icon icon="mdi:check-circle" className="w-5 h-5" />
                            Check Application Status
                        </Button>
                    </div>

                    {/* Proceed Button */}
                    <div className="flex justify-end pt-4">
                        <Button onClick={() => navigate("/form")} className="px-6">
                            Proceed to Registration
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Information Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-3xl w-full">
                <Card className="shadow-md border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:alert-circle" className="w-7 h-7 text-primary" />
                        <p className="font-semibold text-gray-800">Important Notices</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Ensure your documents are uploaded before <strong>March 30</strong>.
                    </p>
                </Card>

                <Card className="shadow-md border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:calendar-clock" className="w-7 h-7 text-primary" />
                        <p className="font-semibold text-gray-800">Upcoming Deadlines</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Registration closes on <strong>April 5</strong>.
                    </p>
                </Card>

                <Card className="shadow-md border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:phone" className="w-7 h-7 text-primary" />
                        <p className="font-semibold text-gray-800">Need Help?</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex flex-col">
                        <span>Contact our support team at</span>
                        <strong>+91 98765 43210</strong>.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
