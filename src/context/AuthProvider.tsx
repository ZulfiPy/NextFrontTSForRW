'use client';

import { useState, createContext } from "react";

interface AuthContextType {
    auth: {
        username: string,
        roles: number[],
        accessToken: string
    },
    setAuth: React.Dispatch<React.SetStateAction<{ username: string, roles: number[], accessToken: string }>>
}

const defaultAuthValues: AuthContextType = {
    auth: {
        username: '',
        roles: [],
        accessToken: ''
    },
    setAuth: () => { }
}

const AuthContext = createContext<AuthContextType>(defaultAuthValues);

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [auth, setAuth] = useState<{ username: string, roles: number[], accessToken: string }>({ username: '', roles: [], accessToken: '' });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthContext,
    AuthProvider
}