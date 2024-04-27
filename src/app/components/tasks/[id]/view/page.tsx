'use client';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Spinner from "@/components/Spinner";
import ViewTaskCard from "@/components/ViewTaskCard";
import { getOneTask } from "@/lib/backendRequests";

const ViewOneTaskPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [task, setTask] = useState<Task>();
    const [loading, setLoading] = useState<boolean>(true);
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        async function fetchOneTask() {
            const response = await getOneTask(id, auth.username, auth.accessToken);

            if (response.status === 200) {
                setTask(response.data)
                setLoading(false);
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
                    <ViewTaskCard task={task} id={id} />
                )}
        </section>
    )
}

export default ViewOneTaskPage;