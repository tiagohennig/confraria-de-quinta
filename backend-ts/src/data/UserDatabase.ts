import { CustomError } from "../error/CustomError";
import { EditUserInput, user } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public insertUser = async (user: user) => {
    try {
      await UserDatabase.queryBuilder()
        .insert({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          nickname: user.nickname,
          email: user.email,
          password: user.password,
          role: user.role
        })
        .into("users");
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  };

  public editUser = async (user: EditUserInput) => {
    try {
      await UserDatabase.queryBuilder()
        .update({ firstName: user.firstName, lastName:user.lastName, nickname: user.nickname })
        .where({ id: user.id })
        .into("users");
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  };

  public findUserByEmail = async (email: string) => {
    try {
      const result = await UserDatabase.queryBuilder()
        .select()
        .from("users")
        .where({email});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  };
  
  public getUserById = async (id: string) => {
    try {
      const result = await UserDatabase.queryBuilder()
        .select()
        .from("users")
        .where({id});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  };

  public login = async (email: string) => {
    try {
      const result = await UserDatabase.queryBuilder()
        .select()
        .from("users")
        .where({email});
      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }


}
