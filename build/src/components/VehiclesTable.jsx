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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Eye, SquarePen, X } from "lucide-react";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getVehicles, deleteVehicle } from "@/lib/backendRequests";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const VehiclesTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        let isMounted = true;
        function fetchVehicles() {
            return __awaiter(this, void 0, void 0, function* () {
                if (isMounted) {
                    const { data, error, status } = yield getVehicles();
                    if (status === 200 && data) {
                        setVehicles(data);
                    }
                    if (status === 500 && error) {
                        setError(error);
                    }
                    return setLoading(false);
                }
            });
        }
        fetchVehicles();
        return () => {
            isMounted = false;
        };
    }, []);
    function handleVehicleDeletion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield deleteVehicle(id);
            if (response.data && response.status === 200) {
                toast.success('Task deleted', { autoClose: 1500 });
                const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== id);
                setVehicles(filteredVehicles);
            }
            if (!response.data) {
                toast.error('Error occured while deleting task', { autoClose: 2500 });
            }
        });
    }
    return (<div className={cn('text-left border-2 rounded-lg p-4', { "h-1/3 overflow-y-auto": vehicles.length >= 4 })}>
            {loading ?
            <Spinner loading={loading}/> :
            error ?
                <p>{error.toString()}</p> :
                vehicles.length === 0 ?
                    <p>Vehicles database is empty</p>
                    :
                        <Table>
                            <TableCaption>A list of cars.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Plate number</TableHead>
                                    <TableHead>VIN</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Gearbox</TableHead>
                                    <TableHead>Fuel type</TableHead>
                                    <TableHead>Colour</TableHead>
                                    <TableHead>RUD</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicles.map((vehicle, index) => (<TableRow key={index}>
                                        <TableCell>{vehicle.plate_number}</TableCell>
                                        <TableCell>{vehicle.vin_code}</TableCell>
                                        <TableCell>{vehicle.brand}</TableCell>
                                        <TableCell>{vehicle.model}</TableCell>
                                        <TableCell>{vehicle.year}</TableCell>
                                        <TableCell>{vehicle.gearbox}</TableCell>
                                        <TableCell>{vehicle.fuel_type}</TableCell>
                                        <TableCell>{vehicle.colour}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <div>
                                                    <button type="button" onClick={() => router.push(`fleet/${vehicle.id}/view`)}>
                                                        <Eye />
                                                    </button>
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => router.push(`fleet//${vehicle.id}/edit`)}>
                                                        <SquarePen />
                                                    </button>
                                                </div>
                                                <div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <X />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Are you absolutely sure?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. Thiw will permanently delete selected vehicle from the database.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleVehicleDeletion(vehicle.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>))}

                            </TableBody>
                        </Table>}
        </div>);
};
export default VehiclesTable;
