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
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import taskSchema from "@/validators/taskFormValidator";
import { updateTask } from "@/lib/backendRequests";
import { Task, TaskRequestBodyType } from "@/lib/types";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

type taskInputType = z.infer<typeof taskSchema>

type EditTaskCardFormProps = {
    task: Task
}

const EditTaskCardForm: React.FC<EditTaskCardFormProps> = ({ task }) => {
    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const form = useForm<taskInputType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title,
            description: task?.description,
            priority: task?.priority,
            status: task?.status,
        }
    });

    async function handleEditedForm(values: taskInputType) {

        const dataToUpdateTask: TaskRequestBodyType = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            status: values.status,
            created_by: auth.username as string
        }
        const response = await updateTask(task.id, dataToUpdateTask);

        if (response.status === 200) {
            toast.success('Task successfully updated', { autoClose: 1500 });
            form.reset();
            router.push('/components/tasks');
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col space-y-4 border-2 rounded-lg p-8"
                    onSubmit={form.handleSubmit(handleEditedForm)}
                >
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
                                    Update title by editing title field
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a description" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Update description by editing description field
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
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={task?.priority}>
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
                        className="font-bold"
                    >Save</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditTaskCardForm;