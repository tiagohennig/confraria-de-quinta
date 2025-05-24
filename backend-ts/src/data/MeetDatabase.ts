import { BaseDatabase } from "./BaseDatabase";
import { Meeting } from "../model/meet";

export class MeetDatabase extends BaseDatabase {
  private static TABLE_NAME = "meetings";

  public async insertMeet(meet: Meeting): Promise<void> {
    await BaseDatabase.queryBuilder()
      .insert(meet)
      .into(MeetDatabase.TABLE_NAME);
  }

  public async getAllMeets(): Promise<Meeting[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(MeetDatabase.TABLE_NAME);
    return result;
  }

  public async getMeetById(id: string): Promise<Meeting | null> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(MeetDatabase.TABLE_NAME)
      .where({ id });
    return result[0] || null;
  }

  public async updateMeet(meet: Meeting): Promise<void> {
    await BaseDatabase.queryBuilder()
      .update(meet)
      .where({ id: meet.id })
      .into(MeetDatabase.TABLE_NAME);
  }

  public async deleteMeet(id: string): Promise<void> {
    await BaseDatabase.queryBuilder()
      .delete()
      .from(MeetDatabase.TABLE_NAME)
      .where({ id });
  }
}