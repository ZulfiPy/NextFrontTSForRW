import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";

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

type taskInputType = z.infer<typeof taskSchema>

interface EditTaskCardFormProps {
    task?: Task | undefined,
    id: String
}

const EditTaskCardForm: React.FC<EditTaskCardFormProps> = ({ task, id }) => {
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
        console.log(values);
    }

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={form.handleSubmit(handleEditedForm)}
                >

                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Task Data</CardTitle>
                            <CardDescription>Edit task in the provided form down below</CardDescription>
                        </CardHeader>
                        <CardContent className="">

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



                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                className="font-bold"
                                variant="outline"
                            >Delete</Button>
                            <Button
                                type="submit"
                                className="font-bold"
                            >Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>Go back</Button>
        </>
    )
}

export default EditTaskCardForm;