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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import vehicleSchema from "@/validators/vehicleFormValidator";
import { Vehicle } from "@/lib/types";
import { updateVehicle } from "@/lib/backendRequests";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

type vehicleInputType = z.infer<typeof vehicleSchema>

const EditVehicleForm = ({ vehicle }: { vehicle: Vehicle }) => {
    const router = useRouter();

    const form = useForm<vehicleInputType>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            plateNumber: vehicle.plate_number,
            vinCode: vehicle.vin_code,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year.toString(),
            gearbox: vehicle.gearbox,
            colour: vehicle.colour,
            fuelType: vehicle.fuel_type
        }
    });

    async function handleEditedForm(values: vehicleInputType) {
        const dataToUpdateVehicle = {
            plate_number: values.plateNumber.toUpperCase(),
            vin_code: values.vinCode.toUpperCase(),
            brand: values.brand,
            model: values.model,
            year: parseInt(values.year),
            gearbox: values.gearbox,
            colour: values.colour,
            fuel_type: values.fuelType
        }

        const { data, status } = await updateVehicle(dataToUpdateVehicle, vehicle.id);

        if (status === 200) {
            toast.success('Task successfully updated', { autoClose: 1500 });
            form.reset();
            router.push('/components/fleet');
        }

        if (status === 500) {
            toast.error(data?.detail, { autoClose: 2500 });
        }

    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col space-y-4 border-2 rounded-lg p-8"
                    onSubmit={form.handleSubmit(handleEditedForm)}>
                    <FormField
                        control={form.control}
                        name="plateNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plate number:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the plate number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: 001ABC
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="vinCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>VIN code:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the VIN code" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: SB1ZB3AEX0E013875
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand of the vehicle:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ether the vehicle brand" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Toyota / Skoda / BMW
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model of the vehicle:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the vehicle model" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Corolla / Octavia / 5 series
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Year of the vehicle" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: 2020
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gearbox"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gearbox:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle gearbox" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                        <SelectItem value="Automatic">Automatic</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                    <FormDescription>
                                        Ex.: Manual / Automatic / Other
                                    </FormDescription>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="colour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Colour:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Colour of the vehicle" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Black / Yellow
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fuel type:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fuel of the vehicle" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Ex.: Petrol / Diesel / Electric / CNG
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="self-center p-5 font-bold">
                        Submit Edited Form
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default EditVehicleForm;