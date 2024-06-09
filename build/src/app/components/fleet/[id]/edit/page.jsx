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
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getVehicleById } from "@/lib/backendRequests";
import EditVehicleForm from "@/components/EditVehicleForm";
const EditVehiclePage = ({ params }) => {
    const { id } = params;
    const [vehicle, setVehicle] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        let isMounted = true;
        function fetchVehicle() {
            return __awaiter(this, void 0, void 0, function* () {
                if (isMounted) {
                    const { data, error, status } = yield getVehicleById(id);
                    if (status === 200 && data) {
                        setVehicle(data);
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
        fetchVehicle();
        return () => {
            isMounted = false;
        };
    }, [id]);
    return (<section className="container flex flex-col items-center justify-center min-h-screen space-y-11">
            <h1 className="text-3xl font-bold mt-10">Edit Vehicle Form</h1>
            {loading ?
            (<Spinner loading={loading}/>) : (vehicle ? (<EditVehicleForm vehicle={vehicle}/>) : (<p>Error: {error.toString()}</p>))}
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>Go back
            </Button>
        </section>);
};
export default EditVehiclePage;
