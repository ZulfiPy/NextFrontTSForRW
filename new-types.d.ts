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
}

export default global;