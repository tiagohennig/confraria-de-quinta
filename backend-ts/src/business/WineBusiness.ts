import { WineDatabase } from "../data/WineDatabase";
import { WineInput, WineUpdateDTO } from "../model/wineDTO";
import { generateId } from "../services/generateId";

export class WineBusiness {
  public createWine = async (input: WineInput) => {
    const { name, year, producer, grape, tastedAt, meetId, country, region } = input;

    if (!name || !year || !producer || !grape || !tastedAt || !meetId || !country || !region) {
      throw new Error(
        'All fields are required. Please provide "name", "year", "producer", "grape", "tastedAt", and "meetId"'
      );
    }

    const id: string = generateId();

    const wineDatabase = new WineDatabase();
    await wineDatabase.insertWine({
      id,
      name,
      year,
      producer,
      country,
      region,
      grape,
      tastedAt,
      meetId,
    });
  };

  public getWines = async () => {
    const wineDatabase = new WineDatabase();
    const wines = await wineDatabase.getAllWines();
    return wines;
  };

  public getWineById = async (id: string) => {
    const wineDatabase = new WineDatabase();
    const wine = await wineDatabase.getWineById(id);
    if (!wine) {
      throw new Error("Wine not found");
    }
    return wine;
  };

  public updateWine = async (input: WineUpdateDTO) => {
    const { id, name, year, producer, grape, score, tastedAt, meetId, country, region } = input;

    const wineDatabase = new WineDatabase();
    await wineDatabase.updateWine({
      id,
      name,
      year,
      producer,
      grape,
      country,
      region,
      score,
      tastedAt,
      meetId,
    });
  };

  public deleteWine = async (id: string) => {
    const wineDatabase = new WineDatabase();
    await wineDatabase.deleteWine(id);
  };

  public getWineByMeetId = async (meetId: string) => {
    const wineDatabase = new WineDatabase();
    const wines = await wineDatabase.getWineByMeetId(meetId);
    return wines;
  };

  public scoreWine = async (id: string, score: number) => {
    const wineDatabase = new WineDatabase();
    await wineDatabase.scoreWine(id, score);
  };
}

