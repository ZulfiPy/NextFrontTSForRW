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

async function getOneTask(id: string, username: string, accessToken: string): Promise<{ data?: Task, error?: any, status: number }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/tasks/${username}/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${accessToken}`
            },
            credentials: 'include'
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
    getOneTask
}