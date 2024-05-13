'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NewVehicleForm from "@/components/NewVehicleForm";

const NewVehiclePage = () => {
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">New Vehicle Form</h1>
            <NewVehicleForm />
            <Button
                type="button"
                className="font-bold text"
                onClick={() => router.back()}
            >
                Go back
            </Button>
        </section>
    )
}

export default NewVehiclePage;