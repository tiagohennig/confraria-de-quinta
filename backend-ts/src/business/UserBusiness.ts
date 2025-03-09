import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidPassword, UnathorizedUser, UserNotFound } from "../error/CustomError";
import { AuthenticationData } from "../model/types";
import {
  UserInputDTO,
  user,
  EditUserInputDTO,
  EditUserInput,
  LoginUserInputDTO,
} from "../model/user";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";

export class UserBusiness {

  userDB = new UserDatabase()

  public createUser = async (input :UserInputDTO) => {
    let {firstName, lastName, nickname, email, password, role} = input 

    if (!firstName || !lastName || !email || !password || !role) {
      throw new CustomError(422, "Ausência de parâmetro") 
    }

    if (role !== "NORMAL" && role !== "ADMIN"){
      role = "NORMAL"
    }

    const id = IdGenerator.generateId()
    const hash = await HashManager.generateHash(password)

    const user :user = {
      id, 
      email, 
      password: hash, 
      firstName,
      lastName,
      nickname: nickname,
      role
    }

    
    await this.userDB.insertUser(user)

    const token = Authenticator.generateToken({id, role})

    return token
  }

  public login = async (input:LoginUserInputDTO) => {
    let {email, password} = input 

    if(!email || !password) {
      throw new CustomError(400, "Ausência de parâmetros")
    }

    const user = await this.userDB.findUserByEmail(email)
    const hashCompare = await HashManager.compareHash(
      password, 
      user.password
    )

    if(!hashCompare){ 
      throw new InvalidPassword()
    }

    const payload :AuthenticationData = {
      id: user.id, 
      role: user.role
    }

    const token = Authenticator.generateToken(payload)

    return token
  }

  public editUser = async (input:EditUserInputDTO, token: string) => {
    let {firstName, lastName, nickname, id} = input 

    if (!firstName || !lastName || !nickname || !token) {
      throw new CustomError(422, "Ausência de parâmetro") 
    }

    const userExist = await this.userDB.getUserById(id)
    if(!userExist){
      throw new UserNotFound()
    }

    const tokenData = Authenticator.getTokenData(token)
    console.log(tokenData)

    if(tokenData.role !== "ADMIN") {
      throw new UnathorizedUser()
    }

    const editedUser :EditUserInput = {
      firstName,
      lastName,
      nickname, 
      id
    }

    await this.userDB.editUser(editedUser)
  }
}