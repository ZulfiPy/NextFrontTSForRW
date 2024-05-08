'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewCustomerCardProps {
    customer?: Customer,
    id: string
}

const ViewCustomerCard = ({ customer, id }: ViewCustomerCardProps) => {
    const router = useRouter();

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
                    <Button
                        type="button"
                        className="font-bold"
                        variant="outline">
                        Delete
                    </Button>
                    <Button
                        type="button"
                        className="font-bold"
                        onClick={() => router.push(`/components/customers/${id}/edit`)}>
                        Edit
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ViewCustomerCard;