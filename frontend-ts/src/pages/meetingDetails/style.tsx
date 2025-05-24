import styled from "styled-components";

export const MeetingDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    
    h2 {
        margin: 30px 0 15px;
        color: #333;
        font-weight: 600;
        width: 100%;
        text-align: left;
    }
    
    .loading-message {
        font-size: 16px;
        margin: 30px 0;
        color: #666;
    }
    
    .error-message {
        color: #e74c3c;
        margin: 30px 0;
        font-size: 16px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        padding: 15px;
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

export const MeetingHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
    
    h1 {
        margin: 0 0 10px;
        font-size: 28px;
        font-weight: 700;
        color: #333;
    }
    
    span {
        font-size: 14px;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 500;
        
        &.upcoming-event {
            background-color: #e3f2fd;
            color: #1565c0;
        }
        
        &.past-event {
            background-color: #f5f5f5;
            color: #666;
        }
    }
    
    @media (max-width: 768px) {
        h1 {
            font-size: 24px;
        }
    }
`;

export const MeetingInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const MeetingDescription = styled.p`
    margin: 0 0 20px;
    font-size: 16px;
    color: #444;
    line-height: 1.5;
`;

export const MeetingMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: #555;
    
    svg {
        color: #333;
        min-width: 18px;
    }
`;

export const WinesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const WineCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
`;

export const WineTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #222;
    }
    
    .wine-year {
        font-weight: 600;
        color: #777;
        font-size: 16px;
    }
`;

export const WineInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
    
    .wine-price {
        margin-top: 5px;
        font-size: 16px;
        
        strong {
            color: #333;
        }
    }
`;

export const WineInfoItem = styled.div`
    font-size: 14px;
    color: #555;
    
    strong {
        font-weight: 600;
        color: #444;
    }
`;

export const WineDescription = styled.div`
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 5px;
    
    p {
        margin: 0;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        font-style: italic;
    }
`;

export const EmptyWines = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px 0;
    background-color: #f9f9f9;
    border-radius: 8px;
    
    p {
        margin: 0;
        color: #777;
        font-size: 15px;
    }
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    background-color: transparent;
    color: #333;
    border: 1px solid #333;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

export const AddWineButton = styled.button`
    padding: 12px 24px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px 0;
    
    &:hover {
        background-color: #555;
        transform: scale(1.02);
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
`;

export const ParticipantsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    margin-top: 10px;
`;

export const ParticipantsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 30px 0 5px;
    
    h2 {
        margin: 0;
    }
    
    .count {
        font-size: 15px;
        color: #666;
        font-weight: 500;
    }
`;

export const ParticipantCard = styled.div`
    background-color: #f5f5f5;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    color: #555;
    font-weight: 500;
`;