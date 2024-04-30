'use client';

import React, { useState, createContext, useEffect } from "react";

interface AuthContextType {
    auth: {
        username: string,
        roles: number[],
        accessToken: string
    },
    setAuth: React.Dispatch<React.SetStateAction<{ username: string, roles: number[], accessToken: string }>>,
    persist: boolean,
    setPersist: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultAuthValues: AuthContextType = {
    auth: {
        username: '',
        roles: [],
        accessToken: ''
    },
    setAuth: () => { },
    persist: false,
    setPersist: () => { }
}

const AuthContext = createContext<AuthContextType>(defaultAuthValues);

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [auth, setAuth] = useState<{ username: string, roles: number[], accessToken: string }>({ username: '', roles: [], accessToken: '' });
    const [persist, setPersist] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthContext,
    AuthProvider
}