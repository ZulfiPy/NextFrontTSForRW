"use server"
import { NewUserDBType } from "./types";
import { db } from "./db";
import { usersTable } from "./db";

async function signUp(formData: NewUserDBType) {
    try {
        const newUser = await db.insert(usersTable).values(formData).returning();

        console.log('new user registered', newUser);

        return { newUser: newUser[0] }
    } catch (error) {
        console.log('error occured while registering new user, error:', error);
        return { error }
    }
}

export {
    signUp,
}
