'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import ViewCustomerCard from "@/components/ViewCustomerCard";
import { getCustomerById } from "@/lib/backendRequests";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ViewCustomerPage = ({ params }) => {
    const { id } = params;
    const [customer, setCustomer] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        let isMounted = true;
        function fetchCustomer() {
            return __awaiter(this, void 0, void 0, function* () {
                if (isMounted) {
                    const { data, status, error } = yield getCustomerById(id);
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
            });
        }
        fetchCustomer();
    }, [id]);
    return (<section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
            (<Spinner loading={loading}/>) : (customer ? (<ViewCustomerCard customer={customer} id={id}/>) : (<p>Error: {error.toString()}</p>))}
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>Go back
            </Button>
        </section>);
};
export default ViewCustomerPage;
