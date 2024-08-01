'use client'
import { createContext, useState } from "react"

interface AuthContextType {
    auth: {
        username: string;
        id: string;
    };
    setAuth: React.Dispatch<React.SetStateAction<{ username: string; id: string }>>
}

export const AuthContext = createContext<AuthContextType>({
    auth: {
        username: '',
        id: ''
    },
    setAuth: () => { }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState({ username: '', id: '' })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}