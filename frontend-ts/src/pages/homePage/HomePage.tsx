import { HomePageContainer, LogoContainer, MeetingDate, BoxMeeting, BoxWines, LineWithText, NextMeeting, ButtonContainer, AdminButtonsContainer, AdminButton, LogoutButton } from "./style";
import logo from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { goToHomePage, goToLoginPage, goToWinesPage } from "../../routes/Coordinator";
import { GlobalStateContext } from "../../Global/GlobalStateContext";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, Meeting } from "../../Constants/Constants";

interface TokenPayload {
    username: string;
    isAdmin: boolean;
    exp: number;
}

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(GlobalStateContext);
    const { isAdmin, setIsAdmin } = useContext(GlobalStateContext);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [nextMeetings, setNextMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateToken = () => {
            const storedToken = localStorage.getItem('token');

            if (!storedToken) {
                console.log('Token não encontrado. Redirecionando para login.');
                setToken('');
                setIsAdmin(false);
                goToLoginPage(navigate);
                return false;
            }

            try {
                const decodedToken = jwtDecode<TokenPayload>(storedToken);

                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    console.log('Token expirado. Redirecionando para login.');
                    localStorage.removeItem('token');
                    setToken('');
                    setIsAdmin(false);
                    goToLoginPage(navigate);
                    return false;
                }

                setToken(storedToken);
                setIsAdmin(!!decodedToken.isAdmin);

                return true;
            } catch (error) {
                console.error('Erro ao validar token:', error);
                localStorage.removeItem('token');
                setToken('');
                setIsAdmin(false);
                goToLoginPage(navigate);
                return false;
            }
        };

        const isValid = validateToken();

        if (isValid) {
            fetchMeetings();
        }
    }, [navigate, setToken, setIsAdmin]);

    const fetchMeetings = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("Token não encontrado");
            }

            const nextMeetingResponse = await axios.get(`${BASE_URL}/reunioes/next`, {
                headers: { Authorization: token }
            });

            const allMeetingsResponse = await axios.get(`${BASE_URL}/reunioes`, {
                headers: { Authorization: token }
            });

            setNextMeetings(nextMeetingResponse.data.meetings || []);

            let allMeetings = allMeetingsResponse.data.meetings || [];
            const pastMeetings = allMeetings.filter((meeting: Meeting) => {
                return new Date(meeting.date) < new Date();
            }).sort((a: Meeting, b: Meeting) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            setMeetings(pastMeetings);

        } catch (error) {
            console.error("Erro ao buscar encontros:", error);

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem('token');
                setToken('');
                setIsAdmin(false);
                goToLoginPage(navigate);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const goToAddWinePage = () => {
        navigate("/adicionarvinho");
    }

    const goToAddMeetingPage = () => {
        navigate("/adicionar-reuniao");
    }

    const goToAddUserPage = () => {
        navigate("/adicionar-usuario");
    }

    const handleMeetingDetails = (id: string) => {
        navigate(`/reuniao/${id}`);
    };

    const handleLogo = () => {
        goToHomePage(navigate)
    }

    const mapWineMeetings = () => {
        if (isLoading) {
            return <div>Carregando reuniões...</div>;
        }

        if (meetings.length === 0) {
            return <div>Nenhum encontro anterior encontrado.</div>;
        }

        return meetings.map((meeting) => (
            <BoxMeeting key={meeting.id} onClick={() => handleMeetingDetails(meeting.id)}>
                <h1>{meeting.name}</h1>
                <p>{meeting.description}</p>
                <MeetingDate>
                    {(() => {
                        const date = new Date(meeting.date);
                        date.setHours(date.getHours() + 3);
                        return date.toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                        });
                    })()}
                </MeetingDate>
            </BoxMeeting>
        ));
    };

    const handleWines = () => {
        goToWinesPage(navigate);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');

        setToken('');
        setIsAdmin(false);

        goToLoginPage(navigate);
    };

    return (
        <HomePageContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>

            {isAdmin && (
                <AdminButtonsContainer>
                    <AdminButton onClick={goToAddMeetingPage}>Criar uma reunião</AdminButton>
                    <AdminButton onClick={goToAddWinePage}>Adicionar vinho</AdminButton>
                    <AdminButton onClick={goToAddUserPage}>Adicionar usuário</AdminButton>
                </AdminButtonsContainer>
            )}

            <BoxWines onClick={handleWines}>
                <h1>Vinhos degustados</h1>
            </BoxWines>

            <LineWithText>
                <span>Próximos encontros</span>
            </LineWithText>

            {isLoading ? (
                <div>Carregando próximos encontros...</div>
            ) : nextMeetings.length > 0 ? (
                nextMeetings.map(meeting => (
                    <NextMeeting key={meeting.id} onClick={() => handleMeetingDetails(meeting.id)}>
                        <h1>{meeting.name}</h1>
                        <p>{meeting.description}</p>
                        <MeetingDate>
                            {(() => {
                                const date = new Date(meeting.date);
                                date.setHours(date.getHours() + 3);
                                return date.toLocaleString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false
                                });
                            })()}
                        </MeetingDate>
                    </NextMeeting>
                ))
            ) : (
                <NextMeeting>
                    <h1>Nenhum encontro agendado</h1>
                    <p>Não há encontros agendados no momento.</p>
                </NextMeeting>
            )}

            <LineWithText>
                <span>Encontros anteriores</span>
            </LineWithText>

            {mapWineMeetings()}

            <ButtonContainer>
                <LogoutButton onClick={handleLogout}>
                    <span className="text">Sair</span>
                </LogoutButton>
            </ButtonContainer>

        </HomePageContainer>
    );
};