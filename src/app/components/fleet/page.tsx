'use client';
import VehiclesTable from "@/components/VehiclesTable";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const FleetPage = () => {
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Vehicles Table</h1>
            <VehiclesTable />
            <Button
                className="py-8 shadow-2xl font-bold text-md"
                onClick={() => router.push('fleet/new-vehicle')}>
                Add a New Vehicle
            </Button>
        </section>
    )
}

export default FleetPage;