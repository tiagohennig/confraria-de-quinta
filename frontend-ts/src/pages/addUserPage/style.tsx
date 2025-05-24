import styled from "styled-components";

export const AddUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    
    h2 {
        margin: 20px 0;
        color: #333;
        font-weight: 600;
    }
    
    .error-message {
        color: #e74c3c;
        margin-bottom: 15px;
        font-size: 14px;
        text-align: center;
        width: 100%;
    }
    
    .success-message {
        color: #2ecc71;
        margin-bottom: 15px;
        font-size: 14px;
        text-align: center;
        width: 100%;
        font-weight: 600;
    }
    
    @media (min-width: 769px) {
        max-width: 500px;
        margin: 0 auto;
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;
    
    img {
        width: 180px;
        height: auto;
    }
    
    @media (max-width: 768px) {
        img {
            width: 150px;
        }
    }
`;

export const FormContainer = styled.form`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    label {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #333;
    }
    
    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        
        &:focus {
            outline: none;
            border-color: #000;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
        
        &:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
        }
    }
`;

export const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
    
    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
    label {
        font-size: 16px;
        cursor: pointer;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-top: 20px;
`;

export const SubmitButton = styled.button`
    flex: 1;
    padding: 12px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #333;
        transform: scale(1.02);
    }
    
    &:active {
        transform: scale(0.98);
    }
    
    &:disabled {
        background-color: #999;
        cursor: not-allowed;
        transform: none;
    }
`;

export const CancelButton = styled.button`
    flex: 1;
    padding: 12px;
    background-color: white;
    color: #000;
    border: 1px solid #000;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    &:active {
        transform: scale(0.98);
    }
    
    &:disabled {
        border-color: #999;
        color: #999;
        cursor: not-allowed;
    }
`;