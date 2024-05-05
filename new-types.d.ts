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