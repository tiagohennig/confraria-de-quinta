import { AuthenticationData } from "../model/user";
import * as jwt from "jsonwebtoken";

class Authenticator {
    generateToken = (payload: AuthenticationData): string => {
        // Make sure payload includes isAdmin
        const token = jwt.sign(
            {
                username: payload.username,
                isAdmin: payload.isAdmin
            }, 
            process.env.JWT_KEY as string, 
            {expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string, 10)}
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