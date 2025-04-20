import { InputBox, HomePageContainer, LogoContainer, BoxMeeting, BoxWines } from "./style";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { goToHomePage, goToLoginPage } from "../../routes/Coordinator";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const BASE_URL = "https://confrariadequinta.herokuapp.com/";

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

const wineMeetings = [
    { id: 1, name: "Vinho Verde", description: "Um encontro com 4 vinhos verdes distintos." },
    { id: 2, name: "Vinhos Brancos", description: "Uma seleção de vinhos brancos." },
    { id: 3, name: "Vinhos Tintos", description: "Uma seleção de vinhos tintos." },
    { id: 4, name: "Vinhos Rosés", description: "Uma seleção de vinhos rosés." },
    { id: 5, name: "Vinhos Espumantes", description: "Uma seleção de vinhos espumantes." },
    { id: 6, name: "Vinhos de Sobremesa", description: "Uma seleção de vinhos de sobremesa." }
];

const mapWineMeetings = () => {
    return wineMeetings.map((wine) => {
        const handleClick = () => {
            goToHomePage(navigate);
        };

        return (
            <BoxMeeting key={wine.id} onClick={handleClick}>
                <h1>{wine.name}</h1>
                <p>{wine.description}</p>
            </BoxMeeting>
        );
    });
};

    const handleClickWines = () => {
        goToHomePage(navigate);
    };

    // const handleLogin = () => {
    //     const body = {
    //         username,
    //         password
    //     }
    //     axios.post(`${BASE_URL}login`, body)
    //         .then((res: AxiosResponse<{ token: string }>) => {
    //             localStorage.setItem('token', res.data.token);
    //             navigate('/home');
    //         })
    //         .catch((err) => { alert(err.response?.data?.message || "An error occurred"); });
    // };

    const handleWines = () => {
        goToHomePage(navigate);
    };

    const handleLogout = () => {
        goToHomePage(navigate);
    };

    return (
        <HomePageContainer>

            <LogoContainer>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            <BoxWines onClick={handleClickWines}>
                <h1>Vinhos degustados</h1>
            </BoxWines>

            <span>Próximo encontro</span>
            
            <BoxMeeting>
                <h1>Vinhos brancos</h1>
            </BoxMeeting>

            <span>Encontros anteriores</span>

            {mapWineMeetings()}

            <button onClick={handleLogout}>Sair</button>

        </HomePageContainer>
    );
};