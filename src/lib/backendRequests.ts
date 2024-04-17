async function registerUserRequest(userData: RegisterUserData) {
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
        const response = await fetch(`http://localhost:3500/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(userDataForSignIn)
        });

        const data = await response.json();

        return { data, status: response.status };
    } catch (error) {
        return { data: { error }, status: 403 };
    }
}

export {
    registerUserRequest,
    signInUserRequest,
}