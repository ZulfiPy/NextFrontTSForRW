'use client';

import { z } from "zod";
import bcrypt from "bcryptjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { RegisterUserData } from "@/lib/types";

import { registerUserRequest } from "@/lib/backendRequests";
import { cn } from "@/lib/utils";

import registerSchema from "@/validators/registerFormValidator";
type registerInputType = z.infer<typeof registerSchema>

const RegisterForm = () => {
    const [formStep, setFormStep] = useState(0);
    const router = useRouter();

    const form = useForm<registerInputType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            isikukood: "",
            day: 0,
            month: 0,
            year: 0,
            username: "",
            password: "",
            confirmPassword: ""
        }
    });

    const dataToRegisterUser: RegisterUserData = {
        firstName: "",
        lastName: "",
        email: "",
        isikukood: "",
        birthDate: "",
        username: "",
        password: "",
    };

    async function handleRegisterForm(values: registerInputType) {
        if (values?.password != values?.confirmPassword) {
            toast.error('Please check the password and confirm password, they do not match!')
            return;
        }

        const hashedPwd = await bcrypt.hash(values.password, 10);

        const formattedDay = values.day.toString().length < 2 ? `0${values.day}` : values.day;
        const formattedMonth = values.month.toString().length < 2 ? `0${values.month}` : values.month;
        const formattedBirthDate = `${formattedDay}.${formattedMonth}.${values.year}`;

        dataToRegisterUser.firstName = values.firstName;
        dataToRegisterUser.lastName = values.lastName;
        dataToRegisterUser.email = values.email;
        dataToRegisterUser.isikukood = values.isikukood;
        dataToRegisterUser.birthDate = formattedBirthDate;
        dataToRegisterUser.username = values.username;
        dataToRegisterUser.password = hashedPwd;

        // POST REQUEST TO THE EXPRESS BACKEND
        const response = await registerUserRequest(dataToRegisterUser);

        if (response.status === 201) {
            toast.success('You have been successfully registered!');
            form.reset();
            router.push('/sign-in');
        }
    }

    async function proceedToNextStep() {
        const fieldNames: Array<'firstName' | 'lastName' | 'email' | 'isikukood' | 'day' | 'month' | 'year'> = ['firstName', 'lastName', 'email', 'isikukood', 'day', 'month', 'year']
        await form.trigger(fieldNames);

        for (let field of fieldNames) {
            const fieldState = form.getFieldState(field);
            if (!fieldState.isDirty || fieldState.invalid) {
                toast.error(`${fieldState.error?.message}`);
                return;
            }
        }
        setFormStep(1);
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Provide accurate and complete information for successful registration.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col"
                            onSubmit={form.handleSubmit(handleRegisterForm)}
                        >
                            <div className={cn("space-y-5", { hidden: formStep === 1 })}>
                                {/* First name */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter a first name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: Alex / Ivan / Mati
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Last name */}
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter a last name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: Gray / Gunden / Liiv
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter an email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: dave.gray@gmail.com
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                {/* Isikukood */}
                                <FormField
                                    control={form.control}
                                    name="isikukood"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Isikukood:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter a personald ID number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: 36703021234
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-row space-x-2">
                                    {/* Day */}
                                    <FormField
                                        control={form.control}
                                        name="day"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Day:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter a birth day" {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || '')}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Example: 1
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Month */}
                                    <FormField
                                        control={form.control}
                                        name="month"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Month:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter a birth month"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Example: 12
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Year */}
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter a birth year"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Example: 1994
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={cn("space-y-5", { hidden: formStep === 0 })}>
                                {/* Username */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: theLuckyOne
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter safe password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Example: Aa$12345!
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Passwords must match
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-2 self-center mt-5">
                                <Button
                                    type="submit"
                                    className={cn("font-bold", { hidden: formStep === 0 })}
                                >
                                    Submit
                                </Button>

                                <Button
                                    type="button"
                                    className={cn("font-bold", { hidden: formStep === 1 })}
                                    onClick={proceedToNextStep}
                                >
                                    Next Step
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <Button
                                    type="button"
                                    className={cn("font-bold", { hidden: formStep === 0 })}
                                    variant={"ghost"}
                                    onClick={() => setFormStep(0)}
                                >
                                    <ArrowLeft className="w-4 h-4 ml-2" /> Go Back
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterForm;