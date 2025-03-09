import { BaseDatabase } from "./BaseDatabase";
import { MeetInputDTO, MeetUpdateDTO } from "../model/meet";

export class MeetDatabase extends BaseDatabase {
  private static TABLE_NAME = "meets";

  public async insertMeet(meet: MeetInputDTO): Promise<void> {
    await BaseDatabase.queryBuilder()
      .insert(meet)
      .into(MeetDatabase.TABLE_NAME);
  }

  public async getAllMeets(): Promise<MeetInputDTO[]> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(MeetDatabase.TABLE_NAME);
    return result;
  }

  public async getMeetById(id: string): Promise<MeetInputDTO | null> {
    const result = await BaseDatabase.queryBuilder()
      .select("*")
      .from(MeetDatabase.TABLE_NAME)
      .where({ id });
    return result[0] || null;
  }

  public async updateMeet(meet: MeetUpdateDTO): Promise<void> {
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