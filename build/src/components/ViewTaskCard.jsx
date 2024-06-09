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
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/lib/backendRequests";
import { convertTimestampWithUTC } from "@/lib/customUtils";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const ViewTaskCard = ({ task }) => {
    const { data: session } = useSession();
    const router = useRouter();
    function handleTaskDeletion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = session === null || session === void 0 ? void 0 : session.user.username;
            const response = yield deleteTask(id, username);
            if (response.status === 200) {
                toast.success('Task deleted', { autoClose: 1000 });
                router.push('/components/tasks');
            }
        });
    }
    return (<>
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
                    <Button type="button" className="font-bold" onClick={() => router.push(`/components/tasks/${task.id}/edit`)}>Edit</Button>
                </CardFooter>
            </Card>
        </>);
};
export default ViewTaskCard;
