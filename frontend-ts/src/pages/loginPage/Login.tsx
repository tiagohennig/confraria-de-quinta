import { InputBox, Title, LoginContainer } from "./style";

export const Login = () => {
    return (
        <LoginContainer>
            <Title>Confraria de Quinta</Title>
            <InputBox>
                <div className="input-group">
                    <label htmlFor="username">Usuário</label>
                    <input id="username" type="text" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" />
                </div>
                <button>Entrar</button>
            </InputBox>
        </LoginContainer>
    );
};