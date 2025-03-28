import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { cn } from "@/lib/utils";

const FormSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    primaryEmail: z.string().email(),
    secondaryEmail: z.string().email().optional(),
    primaryMobile: z.string().min(10, { message: "Invalid mobile number." }),
    secondaryMobile: z.string().min(10, { message: "Invalid mobile number." }).optional(),
    gender: z.enum(["male", "female", "other"]),
    maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
    idType: z.enum(["aadhar", "pan", "passport", "drivingLicense"]),
    idNumber: z.string(),
    idConfirmNumber: z.string(),
    idName: z.string(),
    identificationMark1: z.string().optional(),
    identificationMark2: z.string().optional(),
    caste: z.enum(["general", "obc", "sc", "st"]),
    dob: z.date().optional(),
});

const PersonalDetails = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: "",
            fatherName: "",
            motherName: "",
            primaryEmail: "",
            secondaryEmail: "",
            primaryMobile: "",
            secondaryMobile: "",
            gender: "male",
            maritalStatus: "single",
            idType: "aadhar",
            idNumber: "",
            idConfirmNumber: "",
            idName: "",
            identificationMark1: "",
            identificationMark2: "",
            caste: "general",
            dob: undefined,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const description = `Full Name: ${data.fullName}, Primary Email: ${data.primaryEmail}`;
        toast("Personal Details Submitted", {
            description: description,
            action: {
                label: "View Details",
                onClick: () => {
                    console.log("Viewing details:", data);
                },
            },
        });
    }

    return (
        <Card className="w-full p-4 space-y-4">
            <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Enter your personal information for registration.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father's Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your father's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother's Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your mother's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="primaryEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary Email ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your primary email" {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="secondaryEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secondary Email ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your secondary email" {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="primaryMobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your primary mobile" {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="secondaryMobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secondary Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your secondary mobile" {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maritalStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marital Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="single">Single</SelectItem>
                                                <SelectItem value="married">Married</SelectItem>
                                                <SelectItem value="divorced">Divorced</SelectItem>
                                                <SelectItem value="widowed">Widowed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idType"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>ID Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select ID Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="aadhar">Aadhar Card</SelectItem>
                                                <SelectItem value="pan">PAN Card</SelectItem>
                                                <SelectItem value="passport">Passport</SelectItem>
                                                <SelectItem value="drivingLicense">Driving License</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ID Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter ID Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idConfirmNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm ID Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirm ID Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name on ID Card</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name as on ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="identificationMark1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Physical Identification Mark 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter mark 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="identificationMark2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Physical Identification Mark 2</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter mark 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caste"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Caste</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Caste" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="general">General</SelectItem>
                                                <SelectItem value="obc">OBC</SelectItem>
                                                <SelectItem value="sc">SC</SelectItem>
                                                <SelectItem value="st">ST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-2 w-full"> {/* Added w-full here */}
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Input
                                            id="dob"
                                            placeholder="Select Date"
                                            value={date ? format(date, "PP") : ""}
                                            className="w-full border rounded-md"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-auto">
                                        <Calendar mode="single" selected={date} onSelect={setDate} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default PersonalDetails;