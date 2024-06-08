'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";
import { Eye, SquarePen, X } from "lucide-react"
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteTask } from "@/lib/backendRequests";
import { Task } from "@/lib/types";
import { convertTimestampWithUTC } from "@/lib/customUtils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const TasksTable = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const BACKEND_API_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN

    useEffect(() => {
        async function getTasks() {
            if (loading) {
                try {
                    const response = await fetch(`${BACKEND_API_DOMAIN}/tasks`, {
                        method: "GET",
                        credentials: "include"
                    });

                    if (response.status === 404) {
                        setLoading(false);
                        return;
                    }

                    if (response.status === 401 && status === 'authenticated') {
                        setLoading(true);
                        return;
                    }

                    if (response.ok && response.status === 200) {
                        const responseData = await response.json();
                        setTasks(responseData.tasks);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log('error in fetch tasks useEffect', error);
                }
            }
        }

        getTasks();
    }, [BACKEND_API_DOMAIN, loading]);

    async function handleTaskDeletion(id: string) {
        const username = session?.user.username as string;
        const response = await deleteTask(id, username);

        if (response.status === 200) {
            toast.success('Task deleted', { autoClose: 1000 });
            const filteredTasks = tasks.filter(task => task.id !== id);
            setTasks(filteredTasks);
        }
    }

    return (
        <div className={cn("text-left border-2 rounded-lg p-4", { "h-1/3 overflow-y-auto": tasks.length >= 4 })}>
            {loading ?
                <Spinner loading={loading} /> :
                tasks.length > 0 ?
                    (<Table>
                        <TableCaption>A list of tasks that need to be done at work.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>RUD</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>
                                        {convertTimestampWithUTC(task.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => router.push(`/components/tasks/${task.id}/view`)}>
                                                    <Eye />
                                                </button>
                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => router.push(`/components/tasks/${task.id}/edit`)}>
                                                    <SquarePen />
                                                </button>
                                            </div>

                                            <div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <X />
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Are you absolutely sure?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete selected task from the database.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleTaskDeletion(task.id)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    ) : (
                        <p>
                            Table is empty. Please add a new task see task rendered in the tasks table
                        </p>
                    )}
        </div>
    )
}

export default TasksTable;