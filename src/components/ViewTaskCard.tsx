'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
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
import { X } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/types";
import { deleteTask } from "@/lib/backendRequests";
import { convertTimestampWithUTC } from "@/lib/customUtils";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

type ViewTaskCardProps = {
    task: Task
}

const ViewTaskCard: React.FC<ViewTaskCardProps> = ({ task }) => {
    const router = useRouter();

    async function handleTaskDeletion(id: string) {
        const response = await deleteTask(id);

        if (response.status === 200) {
            toast.success('Task deleted', { autoClose: 1000 });
            router.push('/components/tasks');
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Read Task Data</CardTitle>
                    <CardDescription>Here you can view one task at a time</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <label>
                        <span className="font-bold underline">ID:</span> {task.id}
                    </label>
                    <label>
                        <span className="font-bold underline">Title:</span> {task.title}
                    </label>
                    <label>
                        <span className="font-bold underline">Description:</span> {task.description}
                    </label>
                    <label>
                        <span className="font-bold underline">Priority:</span> {task.priority}
                    </label>
                    <label>
                        <span className="font-bold underline">Status:</span> {task.status}
                    </label>
                    <label>
                        <span className="font-bold underline">Created at:</span> {convertTimestampWithUTC(task.created_at)}
                    </label>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger className="flex">
                            <span className="mr-2">Delete</span> <X />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. Thiw will permanently delete selected task from the database.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleTaskDeletion(task.id)}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button
                        type="button"
                        className="font-bold"
                        onClick={() => router.push(`/components/tasks/${task.id}/edit`)}
                    >Edit</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ViewTaskCard;