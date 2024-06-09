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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { createTask } from "@/lib/backendRequests";
import taskSchema from "@/validators/taskFormValidator";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const NewTaskForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "",
            status: ""
        },
    });
    function handleSubmittedForm(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToCreateTask = {
                title: values.title,
                description: values.description,
                priority: values.priority,
                status: values.status,
                created_by: session === null || session === void 0 ? void 0 : session.user.username
            };
            const createTaskResponse = yield createTask(dataToCreateTask);
            if (createTaskResponse.status === 200) {
                toast.success('New task successfully added', { autoClose: 1500 });
                form.reset();
                router.push('/components/tasks');
            }
            if (createTaskResponse.status === 500) {
                toast.error('Something went wrong, try again later or refresh the page', { autoClose: 1500 });
            }
        });
    }
    return (<div>
            <Form {...form}>
                <form className="flex flex-col space-y-4 border-2 rounded-lg p-8" onSubmit={form.handleSubmit(handleSubmittedForm)}>
                    <FormField control={form.control} name="title" render={({ field }) => (<FormItem>
                                <FormLabel>Title:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a task title" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Ex.: Insurance, Discount Cards...
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}/>

                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a task description" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Ex.: Order new discount cards
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}/>

                    <FormField control={form.control} name="priority" render={({ field }) => (<FormItem>
                                <FormLabel>Priorty:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select task priority"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Middle">Middle</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="URGENT">URGENT</SelectItem>
                                    </SelectContent>
                                    <FormDescription>
                                        Select: Low/Middle/High/URGENT
                                    </FormDescription>
                                    <FormMessage />
                                </Select>
                            </FormItem>)}/>

                    <FormField control={form.control} name="status" render={({ field }) => (<FormItem>
                                <FormLabel>Status:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task status" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Ex.: Started/Close to Finish/Finished
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}/>
                    <Button type="submit" className="self-center p-5 font-bold">
                        Add a New Task</Button>
                    <Button type="button" onClick={() => router.push('/components/tasks')} className="py-7 font-bold">
                        Check Tasks Table</Button>
                </form>
            </Form>
        </div>);
};
export default NewTaskForm;
