import { z } from "zod";

const currentYear: number = new Date().getFullYear();
const eighteenYearsAgo: number = currentYear - 18;

const firstNameSchema = z.string()
    .refine((value) => 3 <= value.length && value.length <= 255, {
        message: "First name must be at least between 3 and 255 characters."
    });

const lastNameSchema = z.string()
    .refine((value) => 3 <= value.length && value.length <= 255, {
        message: "Last name must be at least between 3 and 255 characters."
    });

const isikukoodSchema = z.string()
    .refine((code) => code.length === 11, {
        message: "The ID code must consist of 11 digits."
    });

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

export const registerSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: z.string().email(),
    isikukood: isikukoodSchema,
    day: daySchema,
    month: monthSchema,
    year: yearSchema,
    username: z.string().min(3).max(31),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
});

export default registerSchema;