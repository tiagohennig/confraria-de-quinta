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
    description?: string;
    oakAgeingTime?: string;
    meetId: string;
    price?: string;
}

export const WinesPage = () => {
    const navigate = useNavigate();
    const [wines, setWines] = useState<Wine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWines = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/vinhos`, {
                    headers: { Authorization: token }
                });
                setWines(response.data.wines || []);
            } catch (err: any) {
                console.error("Erro ao buscar vinhos:", err);
                setError(err.response?.data?.message || "Erro ao carregar vinhos");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWines();
    }, []);

    const handleLogo = () => {
        goToHomePage(navigate)
    }

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
        
        <WinesCounter>{wines.length} vinhos encontrados</WinesCounter>
        
        {wines.length === 0 ? (
            <div className="empty-message">Nenhum vinho encontrado</div>
        ) : (
            <>
                <WineList>
                    {wines.map((wine) => (
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
                                </WineInfoColumn>
                                
                                <WineInfoColumn>
                                    <p><strong>Uvas:</strong> {wine.grape}</p>
                                    {wine.price && <p><strong>Preço:</strong> {wine.price}</p>}
                                    {wine.oakAgeingTime && <p><strong>Envelhecimento:</strong> {wine.oakAgeingTime}</p>}
                                </WineInfoColumn>
                            </WineDetails>
                            
                            {wine.description && (
                                <WineDescription>
                                    <p>{wine.description}</p>
                                </WineDescription>
                            )}
                        </WineBox>
                    ))}
                </WineList>
                
                <BackButton onClick={() => goToHomePage(navigate)}>
                    Voltar
                </BackButton>
            </>
        )}
    </WinesPageContainer>
);
}