var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function registerUserRequest(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response;
    });
}
;
function signInUserRequest(userDataForSignIn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userDataForSignIn)
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { data: { error }, status: 403 };
        }
    });
}
function signOutUserRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/signOut`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { data: { error }, status: 403 };
        }
    });
}
function getOneTask(id, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/${username}/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function createTask(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include',
                body: JSON.stringify(values)
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function updateTask(id, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(Object.assign(Object.assign({}, values), { id }))
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function deleteTask(id, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/${username}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function getCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers`, {
                method: "GET",
                credentials: "include"
            });
            const data = yield response.json();
            return { data: data.customers, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function getCustomerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
                method: "GET",
                credentials: "include"
            });
            const data = yield response.json();
            return { data: data.customer, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function createCustomer(customerData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(customerData)
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function updateCustomer(customerData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(customerData)
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function deleteCustomer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/customers/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function getVehicles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles`, {
                method: "GET",
                credentials: "include"
            });
            const data = yield response.json();
            return { data: data.vehicles, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function getVehicleById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
                method: "GET",
                credentials: "include"
            });
            const data = yield response.json();
            return { data: data.vehicle, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function createVehicle(vehicleData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(vehicleData)
            });
            const data = yield response.json();
            return { data: data.vehicle, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function deleteVehicle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = yield response.json();
            return { data: data.message, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
function updateVehicle(vehicleData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/vehicles/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(vehicleData)
            });
            const data = yield response.json();
            return { data, status: response.status };
        }
        catch (error) {
            return { error, status: 500 };
        }
    });
}
export { registerUserRequest, signInUserRequest, signOutUserRequest, getOneTask, createTask, updateTask, deleteTask, getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, getVehicles, getVehicleById, createVehicle, deleteVehicle, updateVehicle, };
