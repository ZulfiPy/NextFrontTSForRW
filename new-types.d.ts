import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare global {
    interface RegisterUserData {
        firstName: string,
        lastName: string,
        email: string,
        isikukood: string,
        birthDate: string,
        username: string,
        password: string
    }

    interface Task {
        id: number,
        title: string,
        description: string,
        priority: string,
        status: string,
        createdat: string,
        createdby: string
    }

    interface Customer {
        id: number,
        first_name: string,
        last_name: string,
        personal_id_number: number,
        is_estonian_resident: boolean,
        birth_date: string,
        driver_license_number: string,
        address: string,
        phone_number: string,
        email: string
    }
}


declare module "next-auth" {
    interface User {
        id?: string;
        firstName?: string,
        lastName?: string,
        username?: string;
        roles?: string;
    }

    interface Session {
        user: User & DefaultSession["user"]
    }
}

export { };