'use client';
import TasksTable from "@/components/TasksTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TasksPage = () => {
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Tasks Table</h1>
            <TasksTable />
            <Button
                className="py-8 shadow-2xl font-bold text-md"
                onClick={() => router.push('tasks/new-task')}>
                Add a New Task
            </Button>
        </section>
    )
}

export default TasksPage;