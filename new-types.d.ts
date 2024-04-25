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


export { };