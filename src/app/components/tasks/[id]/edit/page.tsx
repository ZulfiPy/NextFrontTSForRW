'use client';
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import EditTaskCardForm from "@/components/EditTaskCardForm"
import { getOneTask } from "@/lib/backendRequests";
import { useSession } from "next-auth/react";

const EditTaskPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [task, setTask] = useState<Task>();
    const [loading, setLoading] = useState<boolean>(true);
    const { data: session } = useSession();

    useEffect(() => {

        async function fetchOneTask() {
            if (session?.user) {
                const username = session.user.username as string
                const response = await getOneTask(id, username);

                if (response.status === 200) {
                    setTask(response.data)
                    setLoading(false);
                }
            }
        }

        fetchOneTask();

    }, [id])

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
                (
                    <Spinner loading={loading} />
                ) : (
                    <EditTaskCardForm task={task} id={id} />
                )}
        </section>
    )
}

export default EditTaskPage;