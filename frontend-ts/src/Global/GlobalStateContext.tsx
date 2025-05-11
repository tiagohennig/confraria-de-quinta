import { createContext } from 'react';

export type GlobalStateContextType = {
    token: string | null;
    setToken: (value: string) => void;
    isAdmin: boolean; // Adicione o campo isAdmin
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
    token: null,
    setToken: () => {},
    isAdmin: false, // Valor inicial do isAdmin
});