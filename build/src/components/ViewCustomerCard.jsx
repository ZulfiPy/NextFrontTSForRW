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
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { X, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/lib/backendRequests";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const ViewCustomerCard = ({ customer, id }) => {
    const router = useRouter();
    const handleTaskDeletion = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield deleteCustomer(id);
        if (response.status == 200) {
            toast.success('Customer deleted successfully', { autoClose: 1500 });
            router.push('/components/customers');
        }
    });
    return (<>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Data</CardTitle>
                    <CardDescription>Here you can see one customer at a time</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <label>
                        <span className="font-bold underline">First name:</span> {customer === null || customer === void 0 ? void 0 : customer.first_name}
                    </label>
                    <label>
                        <span className="font-bold underline">Last name:</span> {customer === null || customer === void 0 ? void 0 : customer.last_name}
                    </label>
                    <label>
                        <span className="font-bold underline">Isikukood:</span> {customer === null || customer === void 0 ? void 0 : customer.personal_id_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Resident:</span> {(customer === null || customer === void 0 ? void 0 : customer.is_estonian_resident) ? "Yes" : "No"}
                    </label>
                    <label>
                        <span className="font-bold underline">Birth date:</span> {customer === null || customer === void 0 ? void 0 : customer.birth_date.split('T')[0]}
                    </label>
                    <label>
                        <span className="font-bold underline">Drivers License number:</span> {customer === null || customer === void 0 ? void 0 : customer.drivers_license_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Phone number:</span> {customer === null || customer === void 0 ? void 0 : customer.phone_number}
                    </label>
                    <label>
                        <span className="font-bold underline">Email:</span> {customer === null || customer === void 0 ? void 0 : customer.email}
                    </label>
                    <label>
                        <span className="font-bold underline">Address:</span> {customer === null || customer === void 0 ? void 0 : customer.address}
                    </label>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div>
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
                    <Button type="button" className="font-bold" onClick={() => router.push(`/components/customers/${id}/edit`)}>
                        <span className="mr-2">Edit</span> <SquarePen />
                    </Button>
                </CardFooter>
            </Card>
        </>);
};
export default ViewCustomerCard;
