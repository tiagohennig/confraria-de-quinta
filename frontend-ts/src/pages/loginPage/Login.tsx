import { InputBox, LoginContainer, LogoContainer } from "./style";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { goToHomePage, goToLoginPage } from "../../routes/Coordinator";

export const Login: React.FC = () => {
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

    const handleLogin = () => {
        goToHomePage(navigate);
    };

    return (
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>
            <InputBox>
                <div className="input-group">
                    <label htmlFor="username">Usuário</label>
                    <input id="username" type="text" onChange={handleUsername} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" onChange={handlePassword} />
                </div>
                <button onClick={handleLogin}>Entrar</button>
            </InputBox>
        </LoginContainer>
    );
};