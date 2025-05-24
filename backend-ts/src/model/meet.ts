export interface Meeting {
    id: string;
    name: string;
    description: string;
    date: string;
    place: string;
    host?: string;
    maxParticipants?: number;
}