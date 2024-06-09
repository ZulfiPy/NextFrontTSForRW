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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ViewVehicleCard from "@/components/ViewVehicleCard";
import Spinner from "@/components/Spinner";
import { getVehicleById } from "@/lib/backendRequests";
const ViewVehiclePage = ({ params }) => {
    const { id } = params;
    const [vehicle, setVehicle] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        let isMounted = true;
        function fetchVehicle(id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isMounted) {
                    const { data, error, status } = yield getVehicleById(id);
                    if (status === 200 && data) {
                        setVehicle(data);
                    }
                    if (status === 500 && error) {
                        setError(error);
                    }
                    setLoading(false);
                }
            });
        }
        fetchVehicle(id);
        return () => {
            isMounted = false;
        };
    }, [id]);
    return (<section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
            <Spinner loading={loading}/> :
            error ?
                <p>{error.toString()}</p> :
                vehicle ?
                    <ViewVehicleCard vehicle={vehicle}/> :
                    <p>No vehicle to display.</p>}
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>
                Go back
            </Button>
        </section>);
};
export default ViewVehiclePage;
