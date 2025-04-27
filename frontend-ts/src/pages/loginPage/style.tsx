import styled from 'styled-components';

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;

    img {
        width: 90%;
        height: auto;
    }
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 10px;

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 350px;
        margin-bottom: 20px;
    }

    label {
        color: #000000;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 8px;
        width: 100%;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    input {
        width: 100%;
        height: 50px;
        border-radius: 8px;
        border: 1px solid #000000;
        padding-left: 15px;
        font-size: 16px;
        box-sizing: border-box;

        @media (max-width: 768px) {
            height: 45px;
            font-size: 15px;
        }
    }

    button {
        width: 100%;
        max-width: 350px;
        height: 50px;
        background-color: #000000;
        color: #FFFFFF;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;
        margin-top: 30px;
        transition: all 0.3s ease;
        box-sizing: border-box;

        &:hover {
            background-color: #333333;
            transform: scale(1.05);
        }

        &:active {
            background-color: #555555;
            transform: scale(0.95);
        }

        &:focus {
            outline: 2px solid #FFD700;
            outline-offset: 2px;
        }

        @media (max-width: 768px) {
            height: 45px;
            font-size: 16px;
        }
    }
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 50px;

    @media (min-width: 769px) {
        max-width: 500px;
        margin: 0 auto;
    }
`;