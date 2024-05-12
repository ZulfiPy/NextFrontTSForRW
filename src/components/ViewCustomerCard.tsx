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
} from "@/components/ui/alert-dialog"
import { X, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/lib/backendRequests";
import { Customer } from "@/lib/types";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface ViewCustomerCardProps {
    customer?: Customer,
    id: string
}

const ViewCustomerCard = ({ customer, id }: ViewCustomerCardProps) => {
    const router = useRouter();

    const handleTaskDeletion = async () => {
        const response = await deleteCustomer(id);

        if (response.status == 200) {
            toast.success('Customer deleted successfully', { autoClose: 1500 });
            router.push('/components/customers');
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Data</CardTitle>
                    <CardDescription>Here you can see one customer at a time</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <label>
                        <span className="font-bold underline">First name:</span> {customer?.first_name}
                    </label>
                    <label>
                        <span className="font-bold underline">Last name:</span> {customer?.last_name}
                    </label>
                    <label>
                        <span className="font-bold underline">Isikukood:</span> {customer?.personal_id_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Resident:</span> {customer?.is_estonian_resident ? "Yes" : "No"}
                    </label>
                    <label>
                        <span className="font-bold underline">Birth date:</span> {customer?.birth_date.split('T')[0]}
                    </label>
                    <label>
                        <span className="font-bold underline">Drivers License number:</span> {customer?.driver_license_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Phone number:</span> {customer?.phone_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Email:</span> {customer?.email}
                    </label>
                    <label>
                        <span className="font-bold underline">Address:</span> {customer?.address}
                    </label>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button
                                    type="button"
                                    className="font-bold"
                                    variant="outline"
                                >
                                    <span className="mr-2">Delete</span> <X />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Thiw will permanently delete selected customer from the database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleTaskDeletion}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <Button
                        type="button"
                        className="font-bold"
                        onClick={() => router.push(`/components/customers/${id}/edit`)}>
                        <span className="mr-2">Edit</span> <SquarePen />
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ViewCustomerCard;