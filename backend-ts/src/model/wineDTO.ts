//implement wineDTO

export interface WineInputDTO {
    id: string;
    name: string;
    year: number;
    producer: string;
    country: string;
    region: string;
    grape: string;
    tastedAt: Date;
    meetId: string;
}

export interface WineUpdateDTO {
    id: string;
    name: string;
    year: number;
    producer: string;
    country: string;
    region: string;
    grape: string;
    score: number;
    tastedAt: Date;
    meetId: string;
}

export interface WineInput {
    name: string;
    year: number;
    producer: string;
    country: string;
    region: string;
    grape: string;
    tastedAt: Date;
    meetId: string;
}