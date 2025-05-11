
export type User = {
   username: string
   password: string
   isAdmin: boolean
}

export type UserLoginInput = {
   username: string
   password: string
}

export interface AuthenticationData {
   username: string;
   isAdmin: boolean;
}