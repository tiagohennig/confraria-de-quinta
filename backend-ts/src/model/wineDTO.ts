export interface Wine {
  id: string;
  name: string;
  year: number;
  producer: string;
  country: string;
  region: string;
  grape: string;
  meet_id: string;
  description?: string;
  oak_ageing_time?: string;
  price?: string;
}