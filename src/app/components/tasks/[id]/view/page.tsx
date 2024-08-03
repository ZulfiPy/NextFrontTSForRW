'use client';
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import ViewTaskCard from "@/components/ViewTaskCard";
import { getOneTask } from "@/lib/backendRequests";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ViewOneTaskPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [task, setTask] = useState<Task>();
    const [loading, setLoading] = useState<boolean>(true);
    const {auth} = useContext(AuthContext)
    const router = useRouter();

    useEffect(() => {

        async function fetchOneTask() {
            if (auth.username) {
                const username = auth.username as string
                const response = await getOneTask(id, username);

                if (response.status === 200 && response.data) {
                    setTask(response.data)
                    setLoading(false);
                }

            }
        }

        fetchOneTask();

    }, [id, auth])

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
                (
                    <Spinner loading={loading} />
                ) : (
                    task && <ViewTaskCard task={task} />
                )}
            <Button
                type="button"
                className="mt-6 font-bold"
                onClick={() => router.back()}>
                Go back
            </Button>
        </section>
    )
}

export default ViewOneTaskPage;