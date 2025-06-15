import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHomePage, goToWinesPage } from '../../routes/Coordinator';
import logo from "../../Images/logo.png";
import { 
    AddWineContainer, 
    LogoContainer, 
    FormContainer,
    FormGroup,
    ButtonsContainer,
    SubmitButton,
    CancelButton
} from './style';
import axios from 'axios';
import { BASE_URL, Meeting } from '../../Constants/Constants';

interface WineFormData {
    name: string;
    year: string;
    producer: string;
    country: string;
    region: string;
    grape: string;
    oakAgeingTime: string;
    meetId: string;
    price: string;
}

export const AddWine = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<WineFormData>({
        name: '',
        year: '',
        producer: '',
        country: '',
        region: '',
        grape: '',
        oakAgeingTime: '',
        meetId: '',
        price: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [meetingsLoading, setMeetingsLoading] = useState(true);
    const [meetingsError, setMeetingsError] = useState('');

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
        const requiredFields = ['name', 'year', 'producer', 'country', 'grape', 'meetId'];
        
        for (const field of requiredFields) {
            if (!formData[field as keyof WineFormData]) {
                setError(`O campo ${getFieldLabel(field)} é obrigatório`);
                return false;
            }
        }

        if (formData.year && (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear())) {
            setError('Ano inválido');
            return false;
        }

        return true;
    };

    const getFieldLabel = (field: string): string => {
        const labels: Record<string, string> = {
            name: 'Nome do vinho',
            year: 'Ano',
            producer: 'Produtor',
            country: 'País',
            region: 'Região',
            grape: 'Uvas',
            oakAgeingTime: 'Tempo de Envelhecimento',
            meetId: 'Encontro',
            price: 'Preço'
        };
        return labels[field] || field;
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                setMeetingsLoading(true);
                const token = localStorage.getItem('token');
                
                const response = await axios.get(`${BASE_URL}/reunioes`, {
                    headers: { Authorization: token }
                });
                
                if (response.data.success && response.data.meetings) {
                    const sortedMeetings = response.data.meetings.sort((a: Meeting, b: Meeting) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                    
                    setMeetings(sortedMeetings);
                } else {
                    setMeetingsError('Não foi possível carregar os encontros');
                }
            } catch (error: any) {
                console.error('Erro ao buscar encontros:', error);
                setMeetingsError(error.response?.data?.message || 'Erro ao carregar encontros');
            } finally {
                setMeetingsLoading(false);
            }
        };
        
        fetchMeetings();
    }, []);

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
        return;
    }

    setIsLoading(true);

    try {
        const wineData = {
            name: formData.name,
            year: parseInt(formData.year),
            producer: formData.producer,
            country: formData.country,
            region: formData.region,
            grape: formData.grape,
            oakAgeingTime: formData.oakAgeingTime,
            meetId: formData.meetId,
            price: formData.price
        };

        const token = localStorage.getItem('token');
        await axios.post(`${BASE_URL}/vinhos/create`, wineData, {
            headers: { Authorization: token }
        });
        
        alert('Vinho adicionado com sucesso!');
        goToWinesPage(navigate);
    } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao adicionar vinho');
        console.error('Erro:', err);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <AddWineContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            <h2>Adicionar Novo Vinho</h2>

            <FormContainer onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <FormGroup>
                    <label htmlFor="name">Nome do vinho*</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Dom Pérignon Vintage"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="year">Ano*</label>
                    <input
                        id="year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: 2018"
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="producer">Produtor/Vinícola*</label>
                    <input
                        id="producer"
                        name="producer"
                        type="text"
                        value={formData.producer}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Château Margaux"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="country">País*</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: França"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="region">Região</label>
                    <input
                        id="region"
                        name="region"
                        type="text"
                        value={formData.region}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Bordeaux"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="grape">Uvas*</label>
                    <input
                        id="grape"
                        name="grape"
                        type="text"
                        value={formData.grape}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: Cabernet Sauvignon, Merlot"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="oakAgeingTime">Tempo de Envelhecimento em Carvalho</label>
                    <input
                        id="oakAgeingTime"
                        name="oakAgeingTime"
                        type="text"
                        value={formData.oakAgeingTime}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: 18 meses em carvalho francês"
                    />
                </FormGroup>

            <FormGroup>
                <label htmlFor="meetId">Encontro*</label>
                <select
                    id="meetId"
                    name="meetId"
                    value={formData.meetId}
                    onChange={handleInputChange}
                    disabled={isLoading || meetingsLoading}
                >
                    <option value="">Selecione um encontro</option>
                    {meetingsLoading ? (
                        <option value="" disabled>Carregando encontros...</option>
                    ) : meetingsError ? (
                        <option value="" disabled>Erro ao carregar encontros</option>
                    ) : meetings.length === 0 ? (
                        <option value="" disabled>Nenhum encontro encontrado</option>
                    ) : (
                        meetings.map(meeting => (
                            <option key={meeting.id} value={meeting.id}>
                                {meeting.name} ({new Date(meeting.date).toLocaleDateString('pt-BR')})
                            </option>
                        ))
                    )}
                </select>
                {meetingsError && <p className="field-error">{meetingsError}</p>}
            </FormGroup>

                <FormGroup>
                    <label htmlFor="price">Preço</label>
                    <input
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="Ex: R$ 150,00"
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
                        {isLoading ? 'Salvando...' : 'Salvar Vinho'}
                    </SubmitButton>
                </ButtonsContainer>
            </FormContainer>
        </AddWineContainer>
    );
};