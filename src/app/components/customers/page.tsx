'use client';
import CustomersTable from "@/components/CustomersTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CustomerPage = () => {
    const router = useRouter();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Customers Table</h1>
            <CustomersTable />
            <Button
                className="py-8 shadow-2xl font-bold text-md"
                onClick={() => router.push('customers/new-customer')}>
                Add a New Customer
            </Button>
        </section>
    )
}

export default CustomerPage;