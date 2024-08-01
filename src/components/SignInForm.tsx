'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { login } from "@/lib/serverActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

import { loginSchema } from "@/validators/loginFormValidator";
type loginInputType = z.infer<typeof loginSchema>

const SignInForm = () => {
    const { setAuth } = useContext(AuthContext);
    const [error, setError] = useState('');
    const form = useForm<loginInputType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const router = useRouter();

    async function handleLoginForm(values: loginInputType) {
        const { userData, error } = await login(values.username, values.password);

        if (error) return setError(error);

        toast.success('Successfully logged in!');
        form.reset();
        setError('');
        userData && setAuth(userData)
        return router.push('/');
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

                            <p className="self-center text-red-700">{error}</p>

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