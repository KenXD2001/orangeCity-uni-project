import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, BarChart, User, Settings } from "lucide-react";

function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back, Admin! 🎉</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">Manage your dashboard efficiently with real-time analytics and quick actions.</p>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex items-center gap-2" variant="outline">
                    <User className="w-5 h-5" /> Manage Users
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                    <Activity className="w-5 h-5" /> View Reports
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                    <BarChart className="w-5 h-5" /> Sales Analytics
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                    <Settings className="w-5 h-5" /> Settings
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">1,240</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$25,300</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">98</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>John Doe</TableCell>
                                <TableCell>Logged In</TableCell>
                                <TableCell>Mar 24, 2025</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>Purchased Subscription</TableCell>
                                <TableCell>Mar 23, 2025</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default Dashboard;
