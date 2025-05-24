import { AuthenticationData } from "../model/user";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

class Authenticator {
    generateToken = (payload: AuthenticationData): string => {
    const token = jwt.sign(
        {
            username: payload.username,
            isAdmin: payload.isAdmin
        }, 
        process.env.JWT_KEY || "", 
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'} as SignOptions
    )

    return token
}

    getTokenData = (token: string): AuthenticationData => {
        const result = jwt.verify(
            token, 
            process.env.JWT_KEY as string
        ) as AuthenticationData

        return result
    }
}

export default new Authenticator()