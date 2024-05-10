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

    interface NewCustomerUserData {
        firstName: string,
        lastName: string,
        isEstonianResident: boolean,
        isikukood: string,
        birthDate: string,
        driversLicenseNumber: string,
        address: string,
        phoneNumber: string,
        email: string
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
        customer_id: number,
        first_name: string,
        last_name: string,
        personal_id_number: string,
        is_estonian_resident: boolean,
        birth_date: string,
        driver_license_number: string,
        address: string,
        phone_number: string,
        email: string
    }

    interface AddCustomerDataType {
        firstName: string,
        lastName: string,
        isEstonianResident: boolean,
        isikukood: string,
        birthDate: string,
        driversLicenseNumber: string,
        address: string,
        phoneNumber: string,
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