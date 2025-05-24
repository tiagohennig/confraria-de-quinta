import { InputBox, LoginContainer, LogoContainer } from "./style";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, FormEvent } from "react";
import { GlobalStateContext } from "../../Global/GlobalStateContext";
import { BASE_URL } from "../../Constants/Constants";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(GlobalStateContext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setError("Usuário é obrigatório");
            return;
        }
        
        if (!password) {
            setError("Senha é obrigatória");
            return;
        }
        
        setError("");
        setIsLoading(true);
        
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                username,
                password
            });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LogoContainer>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>
            <InputBox as="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Usuário</label>
                    <input 
                        id="username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </InputBox>
        </LoginContainer>
    );
};