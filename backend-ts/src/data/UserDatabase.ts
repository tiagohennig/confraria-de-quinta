import { CustomError } from "../error/CustomError";
import { User } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";
import { v4 as uuid } from "uuid";

export class UserDatabase extends BaseDatabase {
  public insertUser = async (user: User) => {
    try {
      await UserDatabase.queryBuilder()
        .insert({
          id: uuid(),
          username: user.username,
          password: user.password,
          is_admin: user.isAdmin
        })
        .into("users");
    } catch (error: any) {
      console.error("Erro detalhado:", error);
      throw new CustomError(400, error.sqlMessage);
    }
  };

  public findUserByUsername = async (username: string) => {
    try {
      const result = await UserDatabase.queryBuilder()
        .select()
        .from("users")
        .where({username});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  };

  public login = async (username: string) => {
    try {
      const result = await UserDatabase.queryBuilder()
        .select()
        .from("users")
        .where({username});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
}