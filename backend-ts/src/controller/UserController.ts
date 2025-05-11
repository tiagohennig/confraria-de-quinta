import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { User, UserLoginInput } from "../model/user";

export class UserController {
  private userBusiness: UserBusiness
  constructor(){
    this.userBusiness = new UserBusiness()
  }

      public createUser = async (req: Request, res: Response) => {

        try {
          const input: User = {
            username: req.body.username, 
            password: req.body.password, 
            isAdmin: req.body?.isAdmin || false
          }

          const token = await this.userBusiness.createUser(input)
          
          res.status(201).send({ message: "Usuário criado!", token });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };   
      
      public login = async (req: Request, res: Response) => {
        try {
          const input: UserLoginInput = {
            username: req.body.username,
            password: req.body.password,

          }

          const token = await this.userBusiness.login(input)

          res.status(200).send({message: "Login efetuado com sucesso!", token})
          
        } catch (error: any) {
          res.status(400).send(error.message);
          
        }
      }

}