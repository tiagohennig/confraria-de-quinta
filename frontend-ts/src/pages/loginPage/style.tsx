import styled from 'styled-components';

export const Title = styled.h1`
    color: #000000;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center; /* Ensure text is centered */
    width: 100%; /* Take full width */
    padding: 0 10px; /* Add some padding */

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%; /* Use percentage width */
    max-width: 350px; /* Limit max width */
    margin: 0 auto; /* Center horizontally */
    padding: 0 10px; /* Add some padding */

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Align to the left */
        width: 100%;
        max-width: 300px;
        margin-bottom: 15px;
    }

    label {
        color: #000000;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
        width: 100%;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }

    input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #000000;
        padding-left: 10px;
        box-sizing: border-box; /* Include padding in width */

        @media (max-width: 768px) {
            height: 35px;
        }
    }

    button {
        width: 100%;
        max-width: 300px;
        height: 40px;
        background-color: #000000;
        color: #FFFFFF;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
        transition: all 0.3s ease;
        box-sizing: border-box; /* Include padding in width */

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
            height: 35px;
            font-size: 14px;
        }
    }
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%; /* Use full width */
    box-sizing: border-box; /* Include padding in width */
    padding: 20px; /* Add padding to all sides */

    @media (min-width: 769px) {
        /* For larger phones and tablets */
        max-width: 500px; /* Limit container width */
        margin: 0 auto; /* Center horizontally */
    }
`;