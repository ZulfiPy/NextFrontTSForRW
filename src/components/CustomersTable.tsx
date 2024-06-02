'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
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
import { Eye, SquarePen, X } from "lucide-react"
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCustomers } from "@/lib/backendRequests";
import { deleteCustomer } from "@/lib/backendRequests";
import { Customer } from "@/lib/types";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CustomersTable = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        async function fetchCustomers() {

            if (isMounted) {
                const { data, status, error } = await getCustomers();
                if (status === 200 && data) {
                    setCustomers(data);
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

        fetchCustomers();

        return () => {
            isMounted = false;
        }
    }, []);

    async function handleCustomerDelete(id: number) {
        const ID = id.toString()
        const response = await deleteCustomer(ID);

        if (response.status === 200) {
            const updatedCustomers = customers.filter(customer => customer.id !== id);
            setCustomers(updatedCustomers);
            toast.success('Customer deleted successfully', { autoClose: 1500 });
        }
    }

    return (
        <div className={cn("text-left border-2 rounded-lg p-4", { "h1/3 overflow-y-auto": customers.length >= 4 })}>
            {loading ?
                <Spinner loading />
                : error ?
                    <p>{error.toString()}</p>
                    :
                    customers.length === 0 ?
                        (<p>Database is empty.</p>)
                        :
                        <>
                            {customers.length !== 0 && (
                                <Table>
                                    <TableCaption>A list of customers.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>First name</TableHead>
                                            <TableHead>Last name</TableHead>
                                            <TableHead>Isikukood</TableHead>
                                            <TableHead>Resident</TableHead>
                                            <TableHead>Birth date</TableHead>
                                            <TableHead>Driver License Number</TableHead>
                                            <TableHead>Phone number</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>RUD</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {customers.map((customer, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{customer.first_name}</TableCell>
                                                <TableCell>{customer.last_name}</TableCell>
                                                <TableCell>{customer.personal_id_number}</TableCell>
                                                <TableCell>{customer.is_estonian_resident ? "Yes" : "No"}</TableCell>
                                                <TableCell>{customer.birth_date.split('T')[0]}</TableCell>
                                                <TableCell>{customer.drivers_license_number}</TableCell>
                                                <TableCell>{customer.phone_number}</TableCell>
                                                <TableCell>{customer.email}</TableCell>
                                                <TableCell>{customer.address}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={() => router.push(`customers/${customer.id}/view`)}>
                                                                <Eye />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={() => router.push(`customers/${customer.id}/edit`)}>
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
                                                                            This action cannot be undone. Thiw will permanently delete selected customer from the database.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleCustomerDelete(customer.id)}>
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
            }
        </div>
    )
}

export default CustomersTable;