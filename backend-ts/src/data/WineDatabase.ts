import { Wine } from "../model/wineDTO";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class WineDatabase extends BaseDatabase {
  private static TABLE_NAME = "wines";

  public async insertWine(wine: Wine): Promise<void> {
    try {
      await BaseDatabase.queryBuilder()
        .insert(wine)
        .into(WineDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }

  public async getAllWines(): Promise<Wine[]> {
    try {
      const result = await BaseDatabase.queryBuilder()
        .select("*")
        .from(WineDatabase.TABLE_NAME)
        .orderBy("name", "asc");
      return result;
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }

  public async getWineById(id: string): Promise<Wine | null> {
    try {
      const result = await BaseDatabase.queryBuilder()
        .select("*")
        .from(WineDatabase.TABLE_NAME)
        .where({ id });
      return result[0] || null;
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }

  public async updateWine(wine: Wine): Promise<void> {
    try {
      await BaseDatabase.queryBuilder()
        .update(wine)
        .where({ id: wine.id })
        .into(WineDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }

  public async deleteWine(id: string): Promise<void> {
    try {
      await BaseDatabase.queryBuilder()
        .delete()
        .from(WineDatabase.TABLE_NAME)
        .where({ id });
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }

  public async getWineByMeetId(meetId: string): Promise<Wine[]> {
    try {
      const result = await BaseDatabase.queryBuilder()
        .select("*")
        .from(WineDatabase.TABLE_NAME)
        .where({ meet_id: meetId });
      return result;
    } catch (error: any) {
      throw new CustomError(500, `Database error: ${error.sqlMessage || error.message}`);
    }
  }
}