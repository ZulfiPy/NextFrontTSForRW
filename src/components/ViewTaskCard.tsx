'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewTaskCardProps {
    task?: Task | undefined,
    id: String
}

const ViewTaskCard: React.FC<ViewTaskCardProps> = ({ task, id }) => {
    const router = useRouter();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Read Task Data</CardTitle>
                    <CardDescription>Here you can see one task at a time</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <label>
                        <span className="font-bold underline">ID:</span> {task?.id}
                    </label>
                    <label>
                        <span className="font-bold underline">Title:</span> {task?.title}
                    </label>
                    <label>
                        <span className="font-bold underline">Description:</span> {task?.description}
                    </label>
                    <label>
                        <span className="font-bold underline">Priority:</span> {task?.priority}
                    </label>
                    <label>
                        <span className="font-bold underline">Status:</span> {task?.status}
                    </label>
                    <label>
                        <span className="font-bold underline">Created at:</span> {`${task?.createdat.split('T')[0]} ${task?.createdat.split('T')[1].slice(0, 8)}`}
                    </label>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="font-bold" variant="outline">Delete</Button>
                    <Button
                        type="button"
                        className="font-bold"
                        onClick={() => router.push(`/components/tasks/${id}/edit`)}
                    >Edit</Button>
                </CardFooter>
            </Card>
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>Go back</Button>
        </>
    )
}

export default ViewTaskCard;