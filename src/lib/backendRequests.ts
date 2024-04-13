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

export {
    registerUserRequest
}