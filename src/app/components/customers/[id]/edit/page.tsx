'use client';
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
//
import { getCustomerById } from "@/lib/backendRequests";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const EditCustomerPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [customer, setCustomer] = useState<Customer>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function fetchCustomer() {

            if (isMounted) {
                const { data, status, error } = await getCustomerById(id);

                if (status === 200 && data) {
                    setCustomer(data);
                }

                if (status === 500 && error) {
                    setError(error);
                }

                if (status === 401) {
                    setError('Unauthorized');
                }

                setLoading(false);
            }
        }

        fetchCustomer()

    }, [id]);

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
                (
                    <Spinner loading={loading} />
                ) : (
                    customer ? (
                        <p>Here have to be edit form</p>
                    ) : (
                        <p>Error: {error.toString()}</p>
                    )
                )}
            <Button
                type="button"
                className="mt-6 font-bold"
                onClick={() => router.back()}
            >Go back
            </Button>
        </section>
    )
}

export default EditCustomerPage;