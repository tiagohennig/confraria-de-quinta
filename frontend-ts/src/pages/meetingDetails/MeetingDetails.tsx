import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { goToHomePage, goToAddWinePage } from '../../routes/Coordinator';
import logo from "../../Images/logo.png";
import { 
    MeetingDetailsContainer, 
    LogoContainer,
    MeetingHeader,
    MeetingInfo,
    MeetingDescription,
    MeetingMeta,
    MetaItem,
    WinesList,
    WineCard,
    WineTitle,
    WineInfo,
    WineInfoItem,
    WineDescription,
    BackButton,
    AddWineButton,
    ButtonsContainer,
    EmptyWines,
} from './style';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';
import { GlobalStateContext } from '../../Global/GlobalStateContext';
import { BASE_URL } from '../../Constants/Constants';

interface Wine {
    id: string;
    name: string;
    year: number;
    producer: string;
    country: string;
    region: string;
    grape: string;
    description: string;
    oakAgeingTime: string;
    price: string;
    meetId: string;
}

interface Meeting {
    id: string;
    name: string;
    description: string;
    date: string;
    place: string;
    host: string;
    maxParticipants: number;
    wines: Wine[];
    participants?: { id: string; username: string }[];
}

export const MeetingDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAdmin } = useContext(GlobalStateContext);

useEffect(() => {
    const fetchMeetingDetails = async () => {
        try {
            setIsLoading(true);
            
            const token = localStorage.getItem('token');
            const meetingResponse = await axios.get(`${BASE_URL}/reunioes/${id}`, {
                headers: { Authorization: token }
            });
            
            const winesResponse = await axios.get(`${BASE_URL}/vinhos/meet/${id}`, {
                headers: { Authorization: token }
            });
            
            const meetingData = meetingResponse.data.meeting;
            const winesData = winesResponse.data.wines || [];
            
            setMeeting({
                ...meetingData,
                wines: winesData
            });
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar detalhes do encontro');
            console.error('Erro:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (id) {
        fetchMeetingDetails();
    }
}, [id]);

    const handleLogo = () => {
        goToHomePage(navigate);
    };

    const handleAddWine = () => {
        navigate("/adicionarvinho");
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return format(date, "HH:mm", { locale: ptBR });
    };

    const isPastEvent = (dateString: string): boolean => {
        const eventDate = new Date(dateString);
        return eventDate < new Date();
    };

    const handleDeleteMeeting = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta reunião?")) return;
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/reunioes/delete/${meeting?.id}`, {
            headers: { Authorization: token }
        });
        alert("Reunião deletada com sucesso!");
        goToHomePage(navigate);
    } catch (err: any) {
        alert(err.response?.data?.message || "Erro ao deletar reunião");
    }
};

    if (isLoading) {
        return (
            <MeetingDetailsContainer>
                <LogoContainer onClick={handleLogo}>
                    <img src={logo} alt="Confraria de Quinta" />
                </LogoContainer>
                <p className="loading-message">Carregando detalhes do encontro...</p>
            </MeetingDetailsContainer>
        );
    }

    if (error || !meeting) {
        return (
            <MeetingDetailsContainer>
                <LogoContainer onClick={handleLogo}>
                    <img src={logo} alt="Confraria de Quinta" />
                </LogoContainer>
                <p className="error-message">
                    {error || 'Encontro não encontrado'}
                </p>
                <BackButton onClick={() => goToHomePage(navigate)}>
                    Voltar para Home
                </BackButton>
            </MeetingDetailsContainer>
        );
    }

    const eventStatus = isPastEvent(meeting.date) ? 'realizado' : 'programado';

    return (
        <MeetingDetailsContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            <MeetingHeader>
                <h1>{meeting.name}</h1>
                <span className={isPastEvent(meeting.date) ? 'past-event' : 'upcoming-event'}>
                    {isPastEvent(meeting.date) ? 'Encontro Realizado' : 'Próximo Encontro'}
                </span>
            </MeetingHeader>

            <MeetingInfo>
                <MeetingDescription>
                    {meeting.description}
                </MeetingDescription>
                
                <MeetingMeta>
                    <MetaItem>
                        <span role="img" aria-label="calendar">📅</span>
                        <span>{formatDate(meeting.date)}</span>
                    </MetaItem>
                    <MetaItem>
                        <span role="img" aria-label="clock">⏰</span>
                        <span>{formatTime(meeting.date)}</span>
                    </MetaItem>
                    <MetaItem>
                        <span role="img" aria-label="location">📍</span>
                        <span>{meeting.place}</span>
                    </MetaItem>
                    <MetaItem>
                        <span role="img" aria-label="host">👤</span>
                        <span>Anfitrião: {meeting.host || 'Não definido'}</span>
                    </MetaItem>
                    <MetaItem>
                        <span role="img" aria-label="participants">👥</span>
                        <span>Máximo de {meeting.maxParticipants || '-'} participantes</span>
                    </MetaItem>
                </MeetingMeta>
            </MeetingInfo>

            <h2>Vinhos {eventStatus === 'realizado' ? 'degustados' : 'selecionados'}</h2>

            {meeting.wines && meeting.wines.length > 0 ? (
                <WinesList>
                    {meeting.wines.map((wine) => (
                        <WineCard key={wine.id}>
                            <WineTitle>
                                <h3>{wine.name}</h3>
                                <span className="wine-year">{wine.year}</span>
                            </WineTitle>
                            
                            <WineInfo>
                                <WineInfoItem>
                                    <strong>Produtor:</strong> {wine.producer}
                                </WineInfoItem>
                                <WineInfoItem>
                                    <strong>País/Região:</strong> {wine.country}, {wine.region}
                                </WineInfoItem>
                                <WineInfoItem>
                                    <strong>Uva(s):</strong> {wine.grape}
                                </WineInfoItem>
                                {wine.oakAgeingTime && (
                                    <WineInfoItem>
                                        <strong>Envelhecimento:</strong> {wine.oakAgeingTime}
                                    </WineInfoItem>
                                )}
                                <WineInfoItem className="wine-price">
                                    <strong>Preço:</strong> {wine.price}
                                </WineInfoItem>
                            </WineInfo>
                            
                            {wine.description && (
                                <WineDescription>
                                    <p>{wine.description}</p>
                                </WineDescription>
                            )}
                        </WineCard>
                    ))}
                </WinesList>
            ) : (
                <EmptyWines>
                    <p>Nenhum vinho adicionado para este encontro ainda.</p>
                </EmptyWines>
            )}
            
            {isAdmin && !isPastEvent(meeting.date) && (
                <AddWineButton onClick={handleAddWine}>
                    Adicionar vinho para este encontro
                </AddWineButton>
            )}

            {isAdmin && (
                <AddWineButton
                    style={{ background: "#c0392b", marginBottom: 16 }}
                    onClick={handleDeleteMeeting}
                >
                    Deletar reunião
                </AddWineButton>
            )}

            <ButtonsContainer>
                <BackButton onClick={() => goToHomePage(navigate)}>
                    Voltar para Home
                </BackButton>
            </ButtonsContainer>
        </MeetingDetailsContainer>
    );
};