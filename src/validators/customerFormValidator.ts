import { z } from "zod";

const currentYear: number = new Date().getFullYear();
const eighteenYearsAgo: number = currentYear - 18;

const isikukoodSchema = z.string()

const daySchema = z.number()
    .refine((day) => day >= 1 && day <= 31, {
        message: "Day of your birth must be between 1 and 31."
    });

const monthSchema = z.number()
    .refine((month) => month >= 1 && month <= 12, {
        message: "Month of your birth must be between 1 and 12."
    });

const yearSchema = z.number()
    .refine((year) => year >= 1960 && year <= eighteenYearsAgo, {
        message: `Year of your birth must be between 1960 and ${eighteenYearsAgo}`
    });

const phoneNumberSchema = z.string()
    .refine((number) => number.length >= 7, {
        message: "The phone number must consist at least of 7 digits."
    })

const customerSchema = z.object({
    firstName: z.string().min(2,
        { message: "First name must be at least 2 characters" }).max(50,
            { message: "First name must fit into 50 characters" }),
    lastName: z.string().min(2,
        { message: "First name must be at least 2 characters" }).max(50,
            { message: "First name must fit into 50 characters" }),
    isEstonianResident: z.boolean({ required_error: "Resident field is required" }),
    isikukood: isikukoodSchema,
    day: daySchema,
    month: monthSchema,
    year: yearSchema,
    driversLicenseNumber: z.string().min(4,
        { message: "Drivers license number must be at least 4 characters" }).max(50,
            { message: "Drivers license number must fit into 50 characters" }),
    address: z.string().min(2,
        { message: "Address must be at least 3 characters" }).max(255,
            { message: "Address must fit into 255 characters" }),
    phoneNumber: phoneNumberSchema,
    email: z.string().email()
});

export default customerSchema;