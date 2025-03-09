
export type user = {
   id: string
   email: string
   password: string
   firstName: string
   lastName: string
   nickname: string
   role: string
}

export interface UserInputDTO {
   firstName: string,
   lastName: string,
   nickname: string,
   email: string,
   password: string
   role: string
}

export interface LoginUserInputDTO {
   email: string,
   password: string
}

export interface EditUserInputDTO {
   firstName: string,
   lastName: string,
   nickname: string,
   id: string
}

export interface EditUserInput {
   firstName: string,
   lastName: string,
   nickname: string,
   id: string
}