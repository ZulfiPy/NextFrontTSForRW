"use server"
import { NewUserDBType } from "./types";
import { db } from "./db";
import { usersTable } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { lucia } from "./auth";
import { validateRequest } from "./auth";
import { User, Session } from "lucia";

async function signUp(formData: NewUserDBType): Promise<{ newUser?: NewUserDBType; error?: string | any }> {
    try {
        const newUser = await db.insert(usersTable).values(formData).returning();

        console.log('new user registered', newUser);

        return { newUser: newUser[0] }
    } catch (error) {
        console.log('error occured while registering new user, error:', error);
        return { error }
    }
}


async function login(username: string, password: string): Promise<{ userData?: { username: string; id: string }; error?: string | any }> {
    try {
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username));

        if (existingUser[0]) {
            const hashedPassword = existingUser[0].password;
            const comparedPassword = await bcrypt.compare(password, hashedPassword);
            if (!comparedPassword) return { error: 'Invalid password' }

            const session = await lucia.createSession(existingUser[0].id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return { userData: { username: existingUser[0].username, id: existingUser[0].id } }
        }

        return { error: "User doesn't exist" }

    } catch (error) {
        console.log('error occured while logging in', error);
        return { error }
    }
}

async function logout(): Promise<{ response?: string; error?: string }> {
    const { session } = await validateRequest();

    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    const authSessionCookie = cookies().get('auth_session')?.value;

    if (!authSessionCookie) {
        return { response: 'ok' };
    }

    return { response: '' }
}

async function validateLuciaAuthRequest(): Promise<{ user?: User | null; session?: Session | null; error?: string | any }> {
    try {
        const { user, session } = await validateRequest();

        return { user, session }
    } catch (error) {
        console.log('error occurred while validating request', error)
        return { error }
    }
}

export {
    signUp,
    login,
    logout,
    validateLuciaAuthRequest,
}
