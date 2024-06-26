'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCustomer } from "@/lib/backendRequests";
import { AddCustomerDataType } from "@/lib/types";

import customerSchema from "@/validators/customerFormValidator";
type customerInputType = z.infer<typeof customerSchema>

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const NewCustomerForm = () => {
    const router = useRouter();
    const form = useForm<customerInputType>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            isEstonianResident: true,
            isikukood: "",
            day: 0,
            month: 0,
            year: 0,
            driversLicenseNumber: "",
            address: "",
            phoneNumber: "",
            email: ""
        }
    });

    const handleNewCustomerForm = async (values: customerInputType) => {
        const birthDate = `${values.year}-${values.month}-${values.day}`;

        const customerData: AddCustomerDataType = {
            first_name: values.firstName,
            last_name: values.lastName,
            is_estonian_resident: values.isEstonianResident,
            personal_id_number: values.isikukood,
            birth_date: birthDate,
            drivers_license_number: values.driversLicenseNumber,
            address: values.address,
            phone_number: values.phoneNumber,
            email: values.email
        }

        const response = await createCustomer(customerData);

        const { data, status } = response;

        if (status === 200 && data) {
            toast.success('New customer successfully added', { autoClose: 1500 });
            form.reset();
            router.push('/components/customers');
        }

        if (status === 500) {
            toast.error('Error, try again later', { autoClose: 1500 });
        }
    }

    return (
        <div>
            <Form {...form}>
                <form className="flex flex-col space-y-4 border-2 rounded-lg p-8"
                    onSubmit={form.handleSubmit(handleNewCustomerForm)}>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a first name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Sander / Serhii / Alex
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a last name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Porss / Zelenskiy / Matitov
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isEstonianResident"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox className="w-4 h-4" onCheckedChange={field.onChange} checked={field.value} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="mr-2 items-baseline">Estonian Resident:
                                    </FormLabel>
                                    <FormDescription>
                                        Check if true, else not.
                                    </FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isikukood"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Isikukood:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a isikukood" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: 39001124022
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row space-x-2">
                        {/* Day */}
                        <FormField
                            control={form.control}
                            name="day"
                            render={({ field }) => (
                                <FormItem className="w-20">
                                    <FormLabel>Day:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a birth day" {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || '')}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Example: 1
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Month */}
                        <FormField
                            control={form.control}
                            name="month"
                            render={({ field }) => (
                                <FormItem className="w-20">
                                    <FormLabel>Month:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a birth month"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Example: 12
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Year */}
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem className="w-28">
                                    <FormLabel>Year:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a birth year"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Example: 1994
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="driversLicenseNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Drivers License number:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a drivers license number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: EV123987
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter an address" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Tiiu 3-2, Tallinn
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a phone number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: +372 510 3879
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter an email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: info@rw-rent.ee
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="font-bold self-center p-5">
                        Add A New Customer
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default NewCustomerForm;