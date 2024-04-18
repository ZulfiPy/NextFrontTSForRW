'use client';

import { useState, createContext } from "react";

interface AuthContextType {
    auth: {
        username: string,
        accessToken: string
    },
    setAuth: React.Dispatch<React.SetStateAction<{ username: string, accessToken: string }>>
}

const defaultAuthValues: AuthContextType = {
    auth: {
        username: '',
        accessToken: ''
    },
    setAuth: () => { }
}

const AuthContext = createContext<AuthContextType>(defaultAuthValues);

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [auth, setAuth] = useState<{ username: string, accessToken: string }>({ username: '', accessToken: '' });

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