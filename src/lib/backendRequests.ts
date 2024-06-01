import { RegisterUserData, Task, Customer, AddCustomerDataType, Vehicle, AddVehicleDataType, VehicleResponseData, TaskRequestBodyType } from "./types";

async function registerUserRequest(userData: RegisterUserData): Promise<Response> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    return response;
};

interface SignInResponse {
    data: { jwt?: string, error?: unknown },
    status: number,
}

async function signInUserRequest(userDataForSignIn: { username: string, password: string }): Promise<SignInResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userDataForSignIn)
        });

        const data = await response.json();

        return { data, status: response.status };
    } catch (error) {
        return { data: { error }, status: 403 };
    }
}

async function signOutUserRequest(): Promise<{ data: string | unknown, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/signOut`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        return { data, status: response.status };
    } catch (error) {
        return { data: { error }, status: 403 };
    }
}

async function getOneTask(id: string, username: string): Promise<{ data?: Task, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/${username}/${id}`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

interface taskInputType {
    title: string;
    description: string;
    priority: string;
    status: string;
}

async function createTask(values: TaskRequestBodyType): Promise<{ data?: number, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            'credentials': 'include',
            body: JSON.stringify(values)
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function updateTask(id: string, values: TaskRequestBodyType): Promise<{ data?: Task, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ ...values, id })
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function deleteTask(id: string): Promise<{ data?: string, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id })
        });

        const data = await response.json();

        return { data, status: response.status };
    } catch (error) {
        return { error, status: 500 };
    }
}

async function getCustomers(): Promise<{ data?: Customer[], error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return { data: data.customers, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function getCustomerById(id: string): Promise<{ data?: Customer, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return { data: data.customer, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function createCustomer(customerData: AddCustomerDataType): Promise<{ data?: string, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(customerData)
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error: any) {
        return { error, status: 500 }
    }
}

async function updateCustomer(customerData: AddCustomerDataType, id: string): Promise<{ data?: string, error?: any | undefined, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(customerData)
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function deleteCustomer(id: string): Promise<{ data?: string, error?: any | undefined, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function getVehicles(): Promise<{ data?: Vehicle[], error?: any | undefined, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return { data: data.vehicles, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function getVehicleById(id: string): Promise<{ data?: Vehicle, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return { data: data.vehicle, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function createVehicle(vehicleData: AddVehicleDataType): Promise<{ data?: Vehicle | number, error?: any | undefined, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(vehicleData)
        })

        const data = await response.json();

        return { data: data.vehicle, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function deleteVehicle(id: string): Promise<{ data?: Vehicle | number, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const data = await response.json();

        return { data: data.message, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

async function updateVehicle(vehicleData: AddVehicleDataType, id: string): Promise<{ data?: VehicleResponseData, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(vehicleData)
        });

        const data = await response.json();

        return { data, status: response.status }
    } catch (error) {
        return { error, status: 500 }
    }
}

export {
    registerUserRequest,
    signInUserRequest,
    signOutUserRequest,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getVehicles,
    getVehicleById,
    createVehicle,
    deleteVehicle,
    updateVehicle,
}