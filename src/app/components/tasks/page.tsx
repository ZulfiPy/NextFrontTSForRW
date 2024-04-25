'use-client';
import TasksTable from "@/components/TasksTable";
import { Button } from "@/components/ui/button";

const TasksPage = () => {
    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Tasks Table</h1>
            <TasksTable />
            <Button
                className="py-8 shadow-2xl font-bold text-md">
                Add a New Task
            </Button>
        </section>
    )
}

export default TasksPage;