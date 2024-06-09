import { z } from "zod";
const currentYear = new Date().getFullYear();
const vinSchema = z.string()
    .refine((vin) => vin.length === 17, { message: "The VIN must be 17 characters." });
const yearSchema = z.string()
    .refine((year) => parseInt(year) >= 1900 && parseInt(year) <= currentYear, {
    message: `Vehicle year be between 1900 and ${currentYear}`
});
const vehicleSchema = z.object({
    plateNumber: z.string()
        .min(2, { message: "Plate number must be at least 2 symbols" })
        .max(17, { message: "Plate number must fit into 15 symbols" }),
    vinCode: vinSchema,
    brand: z.string()
        .min(2, { message: "Vehicle brand must be at least 2 characters" })
        .max(50, { message: "Vehicle brand must fit into 50 characters." }),
    model: z.string()
        .min(2, { message: "Vehicle model must be at least 2 characters" })
        .max(50, { message: "vehicle model must fit into 50 characters." }),
    year: yearSchema,
    gearbox: z.string()
        .min(2, { message: "Please select priority of task." }),
    colour: z.string()
        .min(3, { message: "Colour must be at least 3 characters" })
        .max(20, { message: "Colour must fit into 20 charachters" }),
    fuelType: z.string()
        .min(3, { message: "Fuel type must be at least 3 characters" })
        .max(20, { message: "Fuel type must fit into 20 characters" })
});
export default vehicleSchema;
