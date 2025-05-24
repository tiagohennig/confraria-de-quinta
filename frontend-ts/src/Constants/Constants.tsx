export const BASE_URL = "http://localhost:3003";

export interface Meeting {
    id: string;
    name: string;
    description: string;
    date: string;
    place: string;
    host?: string;
    maxParticipants?: number;
}