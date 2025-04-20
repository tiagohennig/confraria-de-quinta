import React from 'react';

export interface GlobalStateContextType {
    restaurants: any[];
    history: any[];
    restDetail: any[];
    setValueNames: (value: string) => void;
    namesValue: string;
    category: string;
    setCategory: (value: string) => void;
    setProfile: (value: any[]) => void;
    profile: any[];
    change: boolean;
    setChange: (value: boolean) => void;
    cartBasket: any[];
    order: any[];
    setOrder: (value: any[]) => void;
}

export const GlobalStateContext = React.createContext<GlobalStateContextType>({
    restaurants: [],
    history: [],
    restDetail: [],
    setValueNames: () => {},
    namesValue: "",
    category: "",
    setCategory: () => {},
    setProfile: () => {},
    profile: [],
    change: false,
    setChange: () => {},
    cartBasket: [],
    order: [],
    setOrder: () => {}
});