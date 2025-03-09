import { WineInputDTO, WineUpdateDTO } from "../model/wineDTO";
import { BaseDatabase } from "./BaseDatabase";


export class WineDatabase extends BaseDatabase {
  private static TABLE_NAME = "wines";

  public async insertWine(wine: WineInputDTO): Promise<void> {
    await BaseDatabase.queryBuilder()
      .insert(wine)
      .into(WineDatabase.TABLE_NAME);
  }

  public async getAllWines(): Promise<WineInputDTO[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME);
    return result;
  }

  public async getWineById(id: string): Promise<WineInputDTO | null> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME)
      .where({ id });
    return result[0] || null;
  }

  public async updateWine(wine: WineUpdateDTO): Promise<void> {
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

  public async getWineByMeetId(meetId: string): Promise<WineInputDTO[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(WineDatabase.TABLE_NAME)
      .where({ meetId });
    return result;
  }

  public async scoreWine(id: string, score: number): Promise<void> {
    await BaseDatabase.queryBuilder()
      .update({ score })
      .where({ id })
      .into(WineDatabase.TABLE_NAME);
}

}