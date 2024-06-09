'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ViewVehicleCard from "@/components/ViewVehicleCard";
import { Vehicle } from "@/lib/types";
import Spinner from "@/components/Spinner";
import { getVehicleById } from "@/lib/backendRequests";

const ViewVehiclePage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        async function fetchVehicle(id: string) {
            if (isMounted) {

                const { data, error, status } = await getVehicleById(id);

                if (status === 200 && data) {
                    setVehicle(data);
                }

                if (status === 500 && error) {
                    setError(error);
                }

                setLoading(false);
            }
        }

        fetchVehicle(id);

        return () => {
            isMounted = false;
        }
    }, [id])

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
                <Spinner loading={loading} /> :
                error ?
                    <p>{error.toString()}</p> :
                    vehicle ?
                        <ViewVehicleCard vehicle={vehicle} /> :
                        <p>No vehicle to display.</p>}
            <Button
                type="button"
                className="mt-6 font-bold"
                onClick={() => router.back()}>
                Go back
            </Button>
        </section>
    )
}

export default ViewVehiclePage;