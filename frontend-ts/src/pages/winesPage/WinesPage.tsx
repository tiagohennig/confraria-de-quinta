import { LogoContainer, WineBox, WinesPageContainer } from "./style";
import logo from "../../Images/logo.png";
import { goToHomePage } from "../../routes/Coordinator";
import { useNavigate } from "react-router-dom";

export const WinesPage = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
        goToHomePage(navigate)
    }

    const wines = [
        {
            id: 1,
            name: "Vinho Verde",
            year: 2021,
            winery: "Quinta da Aveleda",
            country: "Portugal",
            grapes: "Loureiro, Alvarinho",
            description: "Um vinho fresco e leve.",
            oakAgeingTime: "Sem envelhecimento em carvalho",
            price: "R$ 45,00",
        },
        {
            id: 2,
            name: "Vinho Tinto",
            year: 2019,
            winery: "Casa Ferreirinha",
            country: "Portugal",
            grapes: "Touriga Nacional, Tinta Roriz",
            description: "Um vinho encorpado e robusto.",
            oakAgeingTime: "12 meses em carvalho francês",
            price: "R$ 120,00",
        },
        {
            id: 3,
            name: "Vinho Branco",
            year: 2020,
            winery: "Herdade do Esporão",
            country: "Portugal",
            grapes: "Antão Vaz, Arinto",
            description: "Um vinho suave e aromático.",
            oakAgeingTime: "6 meses em carvalho americano",
            price: "R$ 85,00",
        },
        {
            id: 4,
            name: "Vinho Rosé",
            year: 2022,
            winery: "Quinta do Crasto",
            country: "Portugal",
            grapes: "Touriga Nacional",
            description: "Um vinho delicado e frutado.",
            oakAgeingTime: "Sem envelhecimento em carvalho",
            price: "R$ 60,00",
        },
    ];

    return (
        <WinesPageContainer>
            <LogoContainer onClick={handleLogo}>
                <img src={logo} alt="Confraria de Quinta" />
            </LogoContainer>
    
            {wines.map((wine) => (
                <WineBox key={wine.id}>
                    <h2>{wine.name}</h2>
                    <p><strong>Ano:</strong> {wine.year}</p>
                    <p><strong>Vinícola:</strong> {wine.winery}</p>
                    <p><strong>País:</strong> {wine.country}</p>
                    <p><strong>Uvas:</strong> {wine.grapes}</p>
                    <p><strong>Descrição:</strong> {wine.description}</p>
                    <p><strong>Tempo de Envelhecimento:</strong> {wine.oakAgeingTime}</p>
                    <p><strong>Preço:</strong> {wine.price}</p>
                </WineBox>
            ))}
        </WinesPageContainer>
    );
}