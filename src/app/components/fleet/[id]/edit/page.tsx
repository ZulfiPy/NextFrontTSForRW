'use client';
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Vehicle } from "@/lib/types";
import { getVehicleById } from "@/lib/backendRequests";
import EditVehicleForm from "@/components/EditVehicleForm";

const EditVehiclePage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function fetchVehicle() {
            if (isMounted) {
                const { data, error, status } = await getVehicleById(id);

                if (status === 200 && data) {
                    setVehicle(data);
                }

                if (status === 500 && error) {
                    setError(error)
                }

                if (status === 401) {
                    setError('Unauthorized');
                }

                setLoading(false);
            }
        }

        fetchVehicle()

        return () => {
            isMounted = false;
        }

    }, [id])

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Edit Vehicle Form</h1>
            {loading ?
                (
                    <Spinner loading={loading} />
                ) : (
                    vehicle ? (
                        <EditVehicleForm vehicle={vehicle} />
                    ) : (
                        <p>Error: {error.toString()}</p>
                    )
                )
            }
            <Button
                type="button"
                className="mt-6 font-bold"
                onClick={() => router.back()}
            >Go back
            </Button>
        </section>
    )
}

export default EditVehiclePage;