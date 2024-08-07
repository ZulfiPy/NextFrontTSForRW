'use client';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTask } from "@/lib/backendRequests";
import { TaskRequestBodyType } from "@/lib/types";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

import taskSchema from "@/validators/taskFormValidator";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

type taskInputType = z.infer<typeof taskSchema>

const NewTaskForm = () => {
    const { auth } = useContext(AuthContext);
    const router = useRouter();
    const form = useForm<taskInputType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "",
            status: ""
        },
    });

    async function handleSubmittedForm(values: taskInputType) {
        const dataToCreateTask: TaskRequestBodyType = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            status: values.status,
            created_by: auth.username as string
        }

        const createTaskResponse = await createTask(dataToCreateTask)

        if (createTaskResponse.status === 200) {
            toast.success('New task successfully added', { autoClose: 1500 });
            form.reset();
            router.push('/components/tasks');
        }

        if (createTaskResponse.status === 500) {
            toast.error('Something went wrong, try again later or refresh the page', { autoClose: 1500 });
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col space-y-4 border-2 rounded-lg p-8"
                    onSubmit={form.handleSubmit(handleSubmittedForm)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a task title" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Insurance, Discount Cards...
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a task description" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Order new discount cards
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priorty:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select task priority" />
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
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task status" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Started/Close to Finish/Finished
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="self-center p-5 font-bold">
                        Add a New Task</Button>
                    <Button
                        type="button"
                        onClick={() => router.push('/components/tasks')}
                        className="py-7 font-bold">
                        Check Tasks Table</Button>
                </form>
            </Form>
        </div>
    )
}

export default NewTaskForm;