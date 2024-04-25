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
import { Button } from "./ui/button";
import { Eye, SquarePen, X } from "lucide-react"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const TasksTable = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { auth } = useContext(AuthContext);
    const BACKEND_API_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN

    useEffect(() => {
        async function getTasks() {
            if (loading) {
                try {
                    // ok for one time request, but this request has to be handled with
                    // axios interceptors
                    const response = await fetch(`${BACKEND_API_DOMAIN}/tasks`, {
                        method: "GET",
                        headers: {
                            "authorization": `Bearer ${auth.accessToken}`
                        },
                        credentials: "include"
                    });

                    if (response.status === 404) return setLoading(false);

                    if (response.ok && response.status === 200) {
                        const responseData = await response.json();
                        setTasks(responseData.tasks);
                    }
                } catch (error) {
                    console.log('error in fetch tasks useEffect', error);
                } finally {
                    setLoading(false);
                }
            }
        }

        getTasks();
    }, []);

    return (
        <div className="text-left border-2 rounded-lg p-4">
            {loading ?
                <Spinner loading={loading} /> :
                tasks.length === 0 ?
                    (
                        <p>
                            Table is empty. Please add a new task toastify see task rendered in the tasks table
                        </p>
                    ) : (
                        <Table>
                            <TableCaption>A list of tasks that need to be done at work.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>View</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
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
                                            {`${task.createdat.split('T')[0]} ${task.createdat.split('T')[1].slice(0, 8)}`}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                            >
                                                <Eye className="mr-1" />View
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                            >
                                                <SquarePen className="mr-1" />Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                            >
                                                <X className="mr-1" />Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
        </div>
    )
}

export default TasksTable;