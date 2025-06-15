import { WineDatabase } from "../data/WineDatabase";
import { CustomError } from "../error/CustomError";
import { Wine } from "../model/wineDTO";
import { generateId } from "../services/generateId";

export class WineBusiness {
  public createWine = async (input: Wine): Promise<void> => {
    const { name, year, producer, grape, meet_id, country, region } = input;

    if (!name) {
      throw new CustomError(400, "Wine name is required");
    }
    if (!year || year < 1800 || year > new Date().getFullYear()) {
      throw new CustomError(400, "Valid year is required");
    }
    if (!producer) {
      throw new CustomError(400, "Producer is required");
    }
    if (!grape) {
      throw new CustomError(400, "Grape variety is required");
    }
    if (!meet_id) {
      throw new CustomError(400, "Meeting ID is required");
    }
    if (!country) {
      throw new CustomError(400, "Country is required");
    }
    if (!region) {
      throw new CustomError(400, "Region is required");
    }

    const id: string = input.id || generateId();

    const wineDatabase = new WineDatabase();
    
    try {
      await wineDatabase.insertWine({
        id,
        name,
        year,
        producer, 
        country,
        region,
        grape,
        meet_id,
        oak_ageing_time: input.oak_ageing_time,
        price: input.price,
      });
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.message}`);
    }
  };

  public getWines = async (): Promise<Wine[]> => {
    try {
      const wineDatabase = new WineDatabase();
      const wines = await wineDatabase.getAllWines();
      return wines;
    } catch (error: any) {
      throw new CustomError(500, `Error fetching wines: ${error.message}`);
    }
  };

  public getWineById = async (id: string): Promise<Wine> => {
    if (!id) {
      throw new CustomError(400, "Wine ID is required");
    }

    try {
      const wineDatabase = new WineDatabase();
      const wine = await wineDatabase.getWineById(id);
      
      if (!wine) {
        throw new CustomError(404, "Wine not found");
      }
      
      return wine;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(500, `Error fetching wine: ${error.message}`);
    }
  };

  public updateWine = async (input: Wine): Promise<void> => {
    const { id, name, year, producer, grape, meet_id, country, region } = input;

    if (!id) {
      throw new CustomError(400, "Wine ID is required");
    }
    if (!name) {
      throw new CustomError(400, "Wine name is required");
    }
    if (!year || year < 1800 || year > new Date().getFullYear()) {
      throw new CustomError(400, "Valid year is required");
    }
    if (!producer) {
      throw new CustomError(400, "Producer is required");
    }
    if (!grape) {
      throw new CustomError(400, "Grape variety is required");
    }
    if (!meet_id) {
      throw new CustomError(400, "Meeting ID is required");
    }
    if (!country) {
      throw new CustomError(400, "Country is required");
    }
    if (!region) {
      throw new CustomError(400, "Region is required");
    }

    const wineDatabase = new WineDatabase();
    const existingWine = await wineDatabase.getWineById(id);
    
    if (!existingWine) {
      throw new CustomError(404, "Wine not found");
    }

    try {
      await wineDatabase.updateWine({
        id,
        name,
        year,
        producer,
        grape,
        country,
        region,
        meet_id,
        oak_ageing_time: input.oak_ageing_time,
        price: input.price,
      });
    } catch (error: any) {
      throw new CustomError(500, `Error updating wine: ${error.message}`);
    }
  };

  public deleteWine = async (id: string): Promise<void> => {
    if (!id) {
      throw new CustomError(400, "Wine ID is required");
    }

    const wineDatabase = new WineDatabase();
    
    const existingWine = await wineDatabase.getWineById(id);
    
    if (!existingWine) {
      throw new CustomError(404, "Wine not found");
    }

    try {
      await wineDatabase.deleteWine(id);
    } catch (error: any) {
      throw new CustomError(500, `Error deleting wine: ${error.message}`);
    }
  };

  public getWineByMeetId = async (meetId: string): Promise<Wine[]> => {
    if (!meetId) {
      throw new CustomError(400, "Meeting ID is required");
    }

    try {
      const wineDatabase = new WineDatabase();
      const wines = await wineDatabase.getWineByMeetId(meetId);
      return wines;
    } catch (error: any) {
      throw new CustomError(500, `Error fetching wines: ${error.message}`);
    }
  };
}