'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/lib/types";

type ViewVehicleCardProps = {
    vehicle: Vehicle
}

const ViewVehicleCard: React.FC<ViewVehicleCardProps> = ({ vehicle }) => {
    const router = useRouter();

    async function handleVehicleDeletion(id: string) {
        console.log('handle deletion of task');
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Read Vehicle Data</CardTitle>
                    <CardDescription>Here you can view one vehicle at a time.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <label>
                        <span className="font-bold underline">ID:</span> {vehicle.id}
                    </label>
                    <label>
                        <span className="font-bold underline">Plate number:</span> {vehicle.plate_number}
                    </label>
                    <label>
                        <span className="font-bold underline">VIN:</span> {vehicle.vin_code}
                    </label>
                    <label>
                        <span className="font-bold underline">Brand:</span> {vehicle.brand}
                    </label>
                    <label>
                        <span className="font-bold underline">Model:</span> {vehicle.model}
                    </label>
                    <label>
                        <span className="font-bold underline">Year:</span> {vehicle.year}
                    </label>
                    <label>
                        <span className="font-bold underline">Gearbox:</span> {vehicle.gearbox}
                    </label>
                    <label>
                        <span className="font-bold underline">Colour:</span> {vehicle.colour}
                    </label>
                    <label>
                        <span className="font-bold underline">Fuel type:</span> {vehicle.fuel_type}
                    </label>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger className="flex">
                            <span className="mr-2">Delete</span> <X />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. Thiw will permanently delete selected task from the database.
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
                    <Button
                        type="button"
                        className="font-bold"
                        onClick={() => router.push(`/components/fleet/${vehicle.id}/edit`)}
                    >Edit</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ViewVehicleCard;