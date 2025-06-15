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
        font-size: 18px;
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

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;


    @media (min-width: 769px) {
        max-width: 500px;
        margin: 0 auto;
    }
`;

export const LineWithText = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #000000;
    }

    span {
        margin: 0 10px;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
    }
`;

export const BlackButton = styled.button`
    width: 100%;
    max-width: 120px;
    background-color: #000000;
    color: #FFFFFF;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 400;
    transition: all 0.3s ease;
    margin-bottom: 20px;
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
        font-size: 26px;
    }
`;

export const AdminButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 90%;
    max-width: 400px;
    margin: 0 auto 20px auto;
`;

export const AdminButton = styled.button`
    background-color: #000000;
    color: #FFFFFF;
    border-radius: 8px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    
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
        font-size: 13px;
        padding: 8px 12px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0 20px 0;
`;

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    margin-bottom: 10px;

    .icon {
        font-size: 16px;
        opacity: 0.8;
        transform: rotate(-90deg);
        margin-bottom: 2px;
    }

    &:hover {
        background-color: #333;
        color: #fff;
        .icon {
            opacity: 1;
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const BoxMeeting = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 15px 10px;
    border: 1px solid #d1d1d1;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    text-align: center;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    h1 {
        color: #4a2244;
        margin-bottom: 8px;
        font-size: 20px;
    }

    p {
        color: #555;
        margin: 0;
        font-size: 14px;
    }

    &:hover {
        background-color: #f5f5f5;
        border-color: #c0c0c0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 350px;
        margin-bottom: 20px;
    }
`;

export const NextMeeting = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 15px 10px;
    border: 1px solid #722f37;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #FAF5F6;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.15);
    margin-bottom: 20px;

    h1 {
        color: #722f37;
        margin-bottom: 8px;
        font-size: 22px;
    }

    p {
        color: #555;
        margin: 0;
        font-size: 14px;
    }

    &:hover {
        background-color: #fef8f9;
        box-shadow: 0 4px 12px rgba(114, 47, 55, 0.2);
        transform: translateY(-2px);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 350px;
        margin-bottom: 20px;
    }
`;

export const MeetingDate = styled.div`
    margin-top: 8px;
    padding: 6px 0 0 0;
    font-weight: 500;
    color: #722f37;
    border-top: 1px solid #eee;
    font-size: 15px;
    letter-spacing: 0.5px;
    width: 100%;
    text-align: center;
`;

export const BoxWines = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 15px 10px;
    border: 1px solid #4a2244;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f8f6f8;
    box-shadow: 0 2px 5px rgba(74, 34, 68, 0.1);

    h1 {
        color: #4a2244;
        margin-bottom: 8px;
        font-size: 20px;
    }

    p {
        color: #555;
        margin: 0;
        font-size: 14px;
    }

    &:hover {
        background-color: #f6f4f6;
        box-shadow: 0 4px 8px rgba(74, 34, 68, 0.15);
        transform: translateY(-2px);
    }
`;