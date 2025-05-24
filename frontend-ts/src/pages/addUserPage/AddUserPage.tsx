import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHomePage } from '../../routes/Coordinator';
import logo from "../../Images/logo.png";
import axios from 'axios';
import {
    AddUserContainer,
    LogoContainer,
    FormContainer,
    FormGroup,
    ButtonsContainer,
    SubmitButton,
    CancelButton,
    CheckboxGroup
} from './style';
import { BASE_URL } from '../../Constants/Constants';

interface UserFormData {
    username: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
}

export const AddUserPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogo = () => {
        goToHomePage(navigate);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.username || formData.username.trim().length < 3) {
            setError('O nome de usuário deve ter pelo menos 3 caracteres');
            return false;
        }
        
        if (!formData.password || formData.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const userData = {
                username: formData.username,
                password: formData.password,
                isAdmin: formData.isAdmin
            };

            const token = localStorage.getItem('token');
            await axios.post(`${BASE_URL}/user/create`, userData, {
                headers: { Authorization: token }
            });
            
            setSuccessMessage('Usuário criado com sucesso!');
            
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                isAdmin: false
            });
            
            setTimeout(() => {
                goToHomePage(navigate);
            }, 2000);
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao criar usuário');
            console.error('Erro:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AddUserContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            <h2>Adicionar Novo Usuário</h2>

            <FormContainer onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <FormGroup>
                    <label htmlFor="username">Nome de Usuário*</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: joao.silva"
                        required
                        minLength={3}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="password">Senha*</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                        minLength={6}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="confirmPassword">Confirmar Senha*</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                    />
                </FormGroup>

                <CheckboxGroup>
                    <input
                        id="isAdmin"
                        name="isAdmin"
                        type="checkbox"
                        checked={formData.isAdmin}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <label htmlFor="isAdmin">Usuário Administrador</label>
                </CheckboxGroup>

                <ButtonsContainer>
                    <CancelButton 
                        type="button" 
                        onClick={() => goToHomePage(navigate)} 
                        disabled={isLoading}
                    >
                        Cancelar
                    </CancelButton>
                    <SubmitButton 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Criando...' : 'Criar Usuário'}
                    </SubmitButton>
                </ButtonsContainer>
            </FormContainer>
        </AddUserContainer>
    );
};