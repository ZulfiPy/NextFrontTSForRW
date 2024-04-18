'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
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

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { signInUserRequest } from "@/lib/backendRequests";
import { loginSchema } from "@/validators/loginFormValidator";
type loginInputType = z.infer<typeof loginSchema>

const SignInForm = () => {
    const form = useForm<loginInputType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const router = useRouter();
    const { setAuth } = useContext(AuthContext);

    async function handleLoginForm(values: loginInputType) {
        const signInResponse = await signInUserRequest(values);

        if (signInResponse.status === 200 && signInResponse?.data?.jwt) {
            setAuth({ username: values.username, accessToken: signInResponse.data.jwt });
            toast.success('You have been successfully logged in!')
            form.reset();
            router.push('/');
        } else if (signInResponse.status === 403) {
            toast.error('Some error occured, please try again!')
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Provide accurate data to successful logging in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col space-y-4"
                            onSubmit={form.handleSubmit(handleLoginForm)}>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Example: DaveGray777
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter a password"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="font-bold">Sign In</Button>

                            <Link
                                href="/register"
                                className="self-center underline">
                                Forgot username or password?
                            </Link>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignInForm;