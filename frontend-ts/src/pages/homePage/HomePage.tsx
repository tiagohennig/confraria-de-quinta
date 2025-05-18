import { InputBox, HomePageContainer, LogoContainer, BoxMeeting, BoxWines, LineWithText, NextMeeting, BlackButton, ButtonContainer } from "./style";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { goToHomePage, goToLoginPage, goToWinesPage } from "../../routes/Coordinator";
import { GlobalStateContext } from "../../Global/GlobalStateContext";
import { jwtDecode } from "jwt-decode";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(GlobalStateContext);
    const { isAdmin, setIsAdmin } = useContext(GlobalStateContext);
    const BASE_URL = "https://confrariadequinta.herokuapp.com/";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Tempo atual em segundos
            if (decodedToken.exp < currentTime) {
                alert("Token expirado. Faça login novamente.");
                localStorage.removeItem("token");
                goToLoginPage(navigate);
            } else {
                setToken(token); // Atualiza o token no contexto global
            }
            setIsAdmin(decodedToken.isAdmin);
        } else {
            goToLoginPage(navigate);
        }
    }
    , []);

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

    const handleMeetingDetails = (id: string) => {
        navigate(`/meeting/${id}`);
    }

    const handleLogo = () => {
        goToHomePage(navigate)
    }

const mapWineMeetings = () => {
    return wineMeetings.map((wine) => {
        const handleClick = () => {
            goToHomePage(navigate);
        };

        return (
            <BoxMeeting key={wine.id} onClick={() => handleMeetingDetails("2")}>
                <h1>{wine.name}</h1>
                <p>{wine.description}</p>
            </BoxMeeting>
        );
    });
};

    const handleClickWines = () => {
        goToHomePage(navigate);
    };

    const handleWines = () => {
        goToWinesPage(navigate);
    };

    const handleLogout = () => {
        goToLoginPage(navigate);
    };

    return (
        <HomePageContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            {isAdmin && <div>
                <button>Criar uma reunião</button>
                <button>Adicionar vinho</button>
                <button>Adicionar usuário</button>
            </div>}
    
            <BoxWines onClick={handleWines}>
                <h1>Vinhos degustados</h1>
            </BoxWines>
    
            <LineWithText>
                <span>Próximo encontro</span>
            </LineWithText>
    
            <NextMeeting onClick={() => handleMeetingDetails("1")}>
                <h1>Vinhos brancos</h1>
                <p>Uma seleção de vinhos brancos.</p>
            </NextMeeting>
    
            <LineWithText>
                <span>Encontros anteriores</span>
            </LineWithText>
    
            {mapWineMeetings()}

            <ButtonContainer>
                <BlackButton onClick={handleLogout}>
                    Sair
                </BlackButton>
            </ButtonContainer>

        </HomePageContainer>
    );
};