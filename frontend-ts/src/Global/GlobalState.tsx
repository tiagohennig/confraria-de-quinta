import React,
{ useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Constants/Constants'
import { GlobalStateContext } from './GlobalStateContext'
import { useNavigate } from 'react-router-dom';

const GlobalState = (props: any) => {

    const [profile, setProfile] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [restDetail, setRestDetail] = useState([])
    const [namesValue, setValueNames] = useState("")
    const [category, setCategory] = useState("")
    const [change, setChange] = useState(false)
    const [cartBasket, setCart] = useState([])
    const [order, setOrder] = useState([])
    const [history, setHistory] = useState([])
    useEffect(() => {
        // getProfile()
        // getRestaurants()
    }, [])

    useEffect(() => {
        console.log(cartBasket)
    }, [cartBasket])

    // const getProfile = () => {
    //     const token = localStorage.getItem("token");

    //     axios.get(`${BASE_URL}profile`,
    //         {
    //             headers: {
    //                 auth: token,
    //             }
    //         })
    //         .then((res) => {
    //             setProfile(res.data.user)
    //             console.log('aquiii', res.data.user)
    //         })

    // }

    // const getRestaurants = () => {
    //     const token = localStorage.getItem("token");

    //     axios
    //         .get(`${BASE_URL}restaurants`, {
    //             headers: {
    //                 auth: token
    //             },
    //         })
    //         .then((res) => {
    //             setRestaurants(res.data.restaurants);
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data.message);
    //         });
    // };

    const data = {
        // getRestaurants,
        restaurants,
        history,
        restDetail,
        setValueNames,
        namesValue,
        category,
        setCategory,
        setProfile,
        // getProfile,
        profile,
        change,
        setChange,
        cartBasket,
        order,
        setOrder
    }

    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>
    )

}

export default GlobalState