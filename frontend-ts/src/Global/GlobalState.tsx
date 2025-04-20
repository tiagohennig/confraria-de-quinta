import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants/Constants';
import { GlobalStateContext } from './GlobalStateContext';
import { useNavigate } from 'react-router-dom';

interface GlobalStateProps {
    children: React.ReactNode;
}

const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
    const [profile, setProfile] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [restDetail, setRestDetail] = useState<any[]>([]);
    const [namesValue, setValueNames] = useState("");
    const [category, setCategory] = useState("");
    const [change, setChange] = useState(false);
    const [cartBasket, setCart] = useState<any[]>([]);
    const [order, setOrder] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);

    const contextValue = {
        restaurants,
        history,
        restDetail,
        setValueNames,
        namesValue,
        category,
        setCategory,
        setProfile,
        profile,
        change,
        setChange,
        cartBasket,
        order,
        setOrder
    };

    return (
        <GlobalStateContext.Provider value={contextValue}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalState;