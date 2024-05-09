'use client';
import NewCustomerForm from "@/components/NewCustomerForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NewCustomerPage = () => {
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-10">
            <h1 className="text-3xl font-bold mt-10">New Customer Form</h1>
            <NewCustomerForm />
            <Button
                type="button"
                className="font-bold text"
                onClick={() => router.back()}
            >Go back
            </Button>
        </section>
    )
}

export default NewCustomerPage;