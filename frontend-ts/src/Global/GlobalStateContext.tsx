import { createContext } from 'react';

export type GlobalStateContextType = {
    token: string | null;
    setToken: (value: string) => void;
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
    token: null,
    setToken: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
});