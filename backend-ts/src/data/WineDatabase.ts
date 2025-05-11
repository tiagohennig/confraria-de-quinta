import { Wine } from "../model/wineDTO";
import { BaseDatabase } from "./BaseDatabase";


export class WineDatabase extends BaseDatabase {
  private static TABLE_NAME = "wines";

  public async insertWine(wine: Wine): Promise<void> {
    await BaseDatabase.queryBuilder()
      .insert(wine)
      .into(WineDatabase.TABLE_NAME);
  }

  public async getAllWines(): Promise<Wine[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME);
    return result;
  }

  public async getWineById(id: string): Promise<Wine | null> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME)
      .where({ id });
    return result[0] || null;
  }

  public async updateWine(wine: Wine): Promise<void> {
    await BaseDatabase.queryBuilder()
      .update(wine)
      .where({ id: wine.id })
      .into(WineDatabase.TABLE_NAME);
  }

  public async deleteWine(id: string): Promise<void> {
    await BaseDatabase.queryBuilder()
      .delete()
      .from(WineDatabase.TABLE_NAME)
      .where({ id });
  }

  public async getWineByMeetId(meetId: string): Promise<Wine[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME)
      .where({ meetId });
    return result;
  }

}