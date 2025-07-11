import React, { useEffect, useState } from 'react';
import { GlobalStateContext } from './GlobalStateContext';

interface GlobalStateProps {
    children: React.ReactNode;
}

interface TokenPayload {
    isAdmin: boolean;
    username?: string;
    userId?: string;
    iat?: number;
    exp?: number;
}

const decodeToken = (token: string): TokenPayload | null => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const payload = parts[1];
        const decodedPayload = atob(payload);
        const parsedPayload = JSON.parse(decodedPayload);
        
        return parsedPayload;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
    const [token, setToken] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const checkAdmin = async (token: string) => {
        const payload = decodeToken(token);
        if (payload && payload.isAdmin) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        checkAdmin(token);
    }, [token]);

    const globalState = {
        token,
        setToken,
        isAdmin,
        setIsAdmin,
    };

    return (
        <GlobalStateContext.Provider value={globalState}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalState;