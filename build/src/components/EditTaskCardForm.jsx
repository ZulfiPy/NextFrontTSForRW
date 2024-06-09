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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import taskSchema from "@/validators/taskFormValidator";
import { updateTask } from "@/lib/backendRequests";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const EditTaskCardForm = ({ task }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task === null || task === void 0 ? void 0 : task.title,
            description: task === null || task === void 0 ? void 0 : task.description,
            priority: task === null || task === void 0 ? void 0 : task.priority,
            status: task === null || task === void 0 ? void 0 : task.status,
        }
    });
    function handleEditedForm(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataToUpdateTask = {
                title: values.title,
                description: values.description,
                priority: values.priority,
                status: values.status,
                created_by: session === null || session === void 0 ? void 0 : session.user.username
            };
            const response = yield updateTask(task.id, dataToUpdateTask);
            if (response.status === 200) {
                toast.success('Task successfully updated', { autoClose: 1500 });
                form.reset();
                router.push('/components/tasks');
            }
        });
    }
    return (<div>
            <Form {...form}>
                <form className="flex flex-col space-y-4 border-2 rounded-lg p-8" onSubmit={form.handleSubmit(handleEditedForm)}>
                    <FormField control={form.control} name="title" render={({ field }) => (<FormItem>
                                <FormLabel>Title:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a task title" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Update title by editing title field
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}/>

                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a description" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Update description by editing description field
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}/>

                    <FormField control={form.control} name="priority" render={({ field }) => (<FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={task === null || task === void 0 ? void 0 : task.priority}>
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
                                        Select: Low/Middle/High
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

                    <Button type="submit" className="font-bold">Save</Button>
                </form>
            </Form>
        </div>);
};
export default EditTaskCardForm;
