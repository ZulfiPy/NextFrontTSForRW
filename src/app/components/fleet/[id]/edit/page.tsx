'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditVehiclePage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            Edit vehicle page {id}
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