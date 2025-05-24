import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHomePage } from '../../routes/Coordinator';
import logo from "../../Images/logo.png";
import axios from 'axios';
import { BASE_URL } from '../../Constants/Constants';
import {
    AddMeetingContainer,
    LogoContainer,
    FormContainer,
    FormGroup,
    ButtonsContainer,
    SubmitButton,
    CancelButton,
    DateTimeContainer
} from './style';

interface MeetingFormData {
    name: string;
    description: string;
    date: string;
    time: string;
    place: string;
    maxParticipants: string;
    host: string;
}

export const AddMeetingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<MeetingFormData>({
        name: '',
        description: '',
        date: '',
        time: '',
        place: '',
        maxParticipants: '',
        host: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogo = () => {
        goToHomePage(navigate);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const requiredFields = ['name', 'date', 'time', 'place'];
        
        for (const field of requiredFields) {
            if (!formData[field as keyof MeetingFormData]) {
                setError(`O campo ${getFieldLabel(field)} é obrigatório`);
                return false;
            }
        }

        const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
        if (selectedDateTime < new Date()) {
            setError('A data e hora devem ser no futuro');
            return false;
        }

        if (formData.maxParticipants && (isNaN(Number(formData.maxParticipants)) || Number(formData.maxParticipants) <= 0)) {
            setError('Número máximo de participantes deve ser um número positivo');
            return false;
        }

        return true;
    };

    const getFieldLabel = (field: string): string => {
        const labels: Record<string, string> = {
            name: 'Nome do encontro',
            description: 'Descrição',
            date: 'Data',
            time: 'Hora',
            place: 'Local',
            maxParticipants: 'Número máximo de participantes',
            host: 'Anfitrião'
        };
        return labels[field] || field;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const meetingData = {
            name: formData.name,
            description: formData.description || 'Sem descrição',
            date: `${formData.date}T${formData.time}`,
            place: formData.place,
            host: formData.host || undefined,
            maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
            id: `meet-${new Date(formData.date).getFullYear()}-${String(new Date(formData.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(formData.date).getDate()).padStart(2, '0')}-${formData.time.replace(':', '')}`
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/reunioes/create`, meetingData, {
                headers: { Authorization: token }
            });

            console.log('Resposta da API:', response.data);
            
            alert('Reunião criada com sucesso!');
            goToHomePage(navigate);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Erro ao criar reunião';
            setError(errorMessage);
            console.error('Erro:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AddMeetingContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            <h2>Criar Nova Reunião</h2>

            <FormContainer onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <FormGroup>
                    <label htmlFor="name">Nome do Encontro*</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Degustação de Vinhos Tintos"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Descreva o tema e detalhes do encontro..."
                        rows={3}
                    />
                </FormGroup>

                <DateTimeContainer>
                    <FormGroup>
                        <label htmlFor="date">Data*</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="time">Hora*</label>
                        <input
                            id="time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </FormGroup>
                </DateTimeContainer>

                <FormGroup>
                    <label htmlFor="place">Local*</label>
                    <input
                        id="place"
                        name="place"
                        type="text"
                        value={formData.place}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Casa do João, Restaurante Vinícola"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="host">Anfitrião</label>
                    <input
                        id="host"
                        name="host"
                        type="text"
                        value={formData.host}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: João Silva"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="maxParticipants">Número máximo de participantes</label>
                    <input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: 10"
                        min="1"
                    />
                </FormGroup>

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
                        {isLoading ? 'Criando...' : 'Criar Reunião'}
                    </SubmitButton>
                </ButtonsContainer>
            </FormContainer>
        </AddMeetingContainer>
    );
};