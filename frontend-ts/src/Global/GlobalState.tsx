import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants/Constants';
import { GlobalStateContext } from './GlobalStateContext';
import { useNavigate } from 'react-router-dom';

interface GlobalStateProps {
    children: React.ReactNode;
}

// Interface para o payload do token decodificado
interface TokenPayload {
    isAdmin: boolean;
    username?: string;
    userId?: string;
    iat?: number;
    exp?: number;
    // outros campos que possam existir no payload
}

// Função para decodificar o token JWT
const decodeToken = (token: string): TokenPayload | null => {
    try {
        // Dividir o token em suas partes
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        // Decodificar a parte do payload (segunda parte)
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
        console.log("Payload decodificado:", payload);
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