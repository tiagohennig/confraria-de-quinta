export const BASE_URL = "https://afternoon-brook-27246-437b5a258876.herokuapp.com";

export interface Meeting {
    id: string;
    name: string;
    description: string;
    date: string;
    place: string;
    host?: string;
    maxParticipants?: number;
}