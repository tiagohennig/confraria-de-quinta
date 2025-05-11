import { WineDatabase } from "../data/WineDatabase";
import { Wine } from "../model/wineDTO";
import { generateId } from "../services/generateId";

export class WineBusiness {
  public createWine = async (input: Wine) => {
    const { name, year, producer, grape, meetId, country, region } = input;

    if (!name || !year || !producer || !grape || !meetId || !country || !region) {
      throw new Error(
        'All fields are required. Please provide "name", "year", "producer", "grape", "meetId", "country", and "region."'
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
      meetId,
      oakAgeingTime: input.oakAgeingTime,
      price: input.price,
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

  public updateWine = async (input: Wine) => {
    const { id, name, year, producer, grape, meetId, country, region } = input;

    const wineDatabase = new WineDatabase();
    await wineDatabase.updateWine({
      id,
      name,
      year,
      producer,
      grape,
      country,
      region,
      meetId,
      oakAgeingTime: input.oakAgeingTime,
      price: input.price,
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

}

