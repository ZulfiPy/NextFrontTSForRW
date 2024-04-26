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

import taskSchema from "@/validators/taskFormValidator";

type taskInputType = z.infer<typeof taskSchema>

const NewTaskForm = () => {
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
        console.log(values);
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
                                    </SelectContent>
                                    <FormDescription>
                                        Select: Low/Middle/High
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