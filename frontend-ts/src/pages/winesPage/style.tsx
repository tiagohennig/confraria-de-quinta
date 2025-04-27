import styled from "styled-components";

export const WinesPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;

    img {
        width: 90%;
        height: auto;
        cursor: pointer;
    }
`;

export const WineBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    max-width: 400px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid #000000;
    border-radius: 12px;
    background-color: #e5636c;
    color: #ffffff;
    text-align: left;
    transition: all 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
        color: #000000;
        transform: scale(1.02);
    }

    h2 {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }

    p {
        font-size: 16px;
        margin: 5px 0;
    }
`;