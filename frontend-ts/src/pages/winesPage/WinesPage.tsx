import { useEffect, useState } from "react";
import { LogoContainer, WineBox, WinesPageContainer, LoadingSpinner, BackButton, WinesCounter, WineList, WineHeader, WineDetails, WineInfoColumn, WineDescription } from "./style";
import logo from "../../Images/logo.png";
import { goToHomePage } from "../../routes/Coordinator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

interface Wine {
    id: string;
    name: string;
    year: number;
    producer: string;
    country: string;
    region: string;
    grape: string;
    oakAgeingTime?: string;
    meet_id: string;
    price?: string;
}

interface Meeting {
    id: string;
    name: string;
    date: string;
}

export const WinesPage = () => {
    const navigate = useNavigate();
    const [wines, setWines] = useState<Wine[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [winesRes, meetingsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/vinhos`, { headers: { Authorization: token } }),
                    axios.get(`${BASE_URL}/reunioes`, { headers: { Authorization: token } })
                ]);
                setWines(winesRes.data.wines || []);
                setMeetings(meetingsRes.data.meetings || []);
            } catch (err: any) {
                setError(err.response?.data?.message || "Erro ao carregar dados");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogo = () => {
        goToHomePage(navigate)
    }

    const getMeetingInfo = (meet_id: string) => {
        const meeting = meetings.find(m => m.id === meet_id);
        if (!meeting) return "Encontro não encontrado";
        return `${meeting.name} (${new Date(meeting.date).toLocaleDateString("pt-BR")})`;
    };

    if (isLoading) {
        return (
            <WinesPageContainer>
                <LogoContainer onClick={handleLogo}>
                    <img src={logo} alt="Confraria de Quinta" />
                </LogoContainer>
                <LoadingSpinner>Carregando vinhos...</LoadingSpinner>
            </WinesPageContainer>
        );
    }

    if (error) {
        return (
            <WinesPageContainer>
                <LogoContainer onClick={handleLogo}>
                    <img src={logo} alt="Confraria de Quinta" />
                </LogoContainer>
                <div className="error-message">{error}</div>
                <button onClick={() => window.location.reload()}>Tentar novamente</button>
            </WinesPageContainer>
        );
    }

    return (
        <WinesPageContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            {wines.length > 0 && <WinesCounter>{wines.length} vinhos encontrados</WinesCounter>}

            {wines.length === 0 ? (
                <div className="empty-message">Nenhum vinho encontrado</div>
            ) : (
                <>
                    <WineList>
                        {[...wines]
                            .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
                            .map((wine) => (
                                <WineBox key={wine.id}>
                                    <WineHeader>
                                        <h2>{wine.name}</h2>
                                        <span className="year">{wine.year}</span>
                                    </WineHeader>

                                    <WineDetails>
                                        <WineInfoColumn>
                                            <p><strong>Vinícola:</strong> {wine.producer}</p>
                                            <p><strong>País:</strong> {wine.country}</p>
                                            <p><strong>Região:</strong> {wine.region}</p>
                                            <p><strong>Encontro:</strong> {getMeetingInfo(wine.meet_id)}</p>
                                            <p><strong>Uvas:</strong> {wine.grape}</p>
                                            {wine.price && <p><strong>Preço:</strong> {wine.price}</p>}
                                            {wine.oakAgeingTime && <p><strong>Envelhecimento:</strong> {wine.oakAgeingTime}</p>}
                                        </WineInfoColumn>
                                    </WineDetails>
                                </WineBox>
                            ))}
                    </WineList>
                </>
            )}
            <BackButton onClick={() => goToHomePage(navigate)}>
                Voltar
            </BackButton>
        </WinesPageContainer>
    );
};