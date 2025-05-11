import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidPassword, UnathorizedUser, UserNotFound } from "../error/CustomError";
import { AuthenticationData, UserLoginInput } from "../model/user";
import {
  User,
} from "../model/user";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";

export class UserBusiness {

  userDB = new UserDatabase()

  public createUser = async (input :User) => {
    let {username, password, isAdmin} = input 

    if (!username|| !password) {
      throw new CustomError(422, "Ausência de parâmetro") 
    }

    if (!isAdmin){
      isAdmin = false
    }

    const hash = await HashManager.generateHash(password)

    const user :User = {
      username, 
      password: hash, 
      isAdmin
    }

    
    await this.userDB.insertUser(user)

    const token = Authenticator.generateToken({
      username: user.username,
      isAdmin: user.isAdmin
  });

    return token
  }

  public login = async (input:UserLoginInput) => {
    let {username, password} = input 

    if(!username || !password) {
      throw new CustomError(400, "Ausência de parâmetros")
    }

    const user = await this.userDB.findUserByUsername(username)
    const hashCompare = await HashManager.compareHash(
      password, 
      user.password
    )

    if(!hashCompare){ 
      throw new InvalidPassword()
    }

    const payload :AuthenticationData = {
      username: user.username, 
      isAdmin: user.is_admin
    }

    const token = Authenticator.generateToken(payload)

    return token
  }

}