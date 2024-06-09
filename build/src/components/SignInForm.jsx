'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/validators/loginFormValidator";
const SignInForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });
    function handleLoginForm(values) {
        return __awaiter(this, void 0, void 0, function* () {
            signIn("credentials", { username: values.username, password: values.password });
        });
    }
    return (<div>
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Provide accurate data to successful logging in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(handleLoginForm)}>
                            <FormField control={form.control} name="username" render={({ field }) => (<FormItem>
                                        <FormLabel>Username:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a username" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            Example: DaveGray777
                                        </FormDescription>
                                    </FormItem>)}/>

                            <FormField control={form.control} name="password" render={({ field }) => (<FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter a password" {...field}/>
                                        </FormControl>
                                    </FormItem>)}/>

                            <Button type="submit" className="font-bold">Sign In</Button>

                            <Link href="/register" className="self-center underline">
                                Forgot username or password?
                            </Link>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>);
};
export default SignInForm;
