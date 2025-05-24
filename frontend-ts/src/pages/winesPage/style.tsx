import styled from "styled-components";

export const WinesPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 100%; /* Alterado para 100% */
    margin: 0 auto; /* Adicionado auto para centralizar */
    box-sizing: border-box; /* Importante: inclui padding no cálculo da largura */
    overflow-x: hidden; /* Previne rolagem horizontal */
    
    .error-message {
        color: #e74c3c;
        margin: 20px 0;
        padding: 15px;
        background-color: #feeaeb;
        border-radius: 8px;
        width: 100%;
        max-width: 500px;
        text-align: center;
        box-sizing: border-box; /* Garante que o padding não cause overflow */
    }
    
    .empty-message {
        margin: 40px 0;
        color: #666;
        font-size: 18px;
        width: 100%; /* Garante que não ultrapasse a largura do container */
        text-align: center;
    }
    
    button {
        padding: 10px 20px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        margin-top: 10px;
    }
    
    @media (min-width: 768px) {
        max-width: 800px; /* Largura máxima para telas maiores */
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    margin-bottom: 20px;
    
    img {
        max-width: 180px;
        width: 100%; /* Garante responsividade */
        height: auto; /* Mantém proporção */
    }
`;

export const WinesCounter = styled.div`
    font-size: 15px;
    color: #777;
    margin-bottom: 15px;
    text-align: center;
    width: 100%;
`;

export const WineList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    box-sizing: border-box; /* Importante para prevenir overflow */
`;

export const WineBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Garante que o padding não aumente a largura */
    word-wrap: break-word; /* Permite quebra de palavras longas */
    overflow-wrap: break-word; /* Compatibilidade com navegadores mais antigos */
    
    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    }
`;

export const WineHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #eee;
    width: 100%;
    box-sizing: border-box;
    
    h2 {
        margin: 0;
        font-size: 18px;
        color: #4a2244;
        font-weight: 600;
        overflow: hidden; /* Impede overflow de texto */
        text-overflow: ellipsis; /* Adiciona ... em textos longos */
        flex: 1; /* Permite que o título ocupe o espaço disponível */
        padding-right: 10px; /* Espaço para o ano */
    }
    
    .year {
        background-color: #4a2244;
        color: white;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap; /* Impede quebra */
    }
`;

export const WineDetails = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 500px) {
        flex-direction: column;
        gap: 5px;
    }
`;

export const WineInfoColumn = styled.div`
    flex: 1;
    min-width: 0; /* Importante para permitir que o flex shrink funcione */
    
    p {
        margin: 5px 0;
        font-size: 14px;
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
        
        strong {
            color: #333;
            font-weight: 600;
        }
    }
`;

export const WineDescription = styled.div`
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed #eee;
    width: 100%;
    box-sizing: border-box;
    
    p {
        margin: 0;
        font-size: 13px;
        color: #666;
        font-style: italic;
        overflow-wrap: break-word;
    }
`;

export const BackButton = styled.button`
    margin: 25px auto 10px;
    padding: 10px 20px;
    background-color: #4a2244;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #5a3254;
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

export const LoadingSpinner = styled.div`
    margin: 40px 0;
    font-size: 18px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    &::after {
        content: "";
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-top: 2px solid #4a2244;
        border-radius: 50%;
        margin-left: 10px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;