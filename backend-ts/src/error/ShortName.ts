import { CustomError } from "./CustomError";

export class ShortName extends CustomError {
    constructor(){
        super(406, "Nome inválido, precisa ter pelo menos 3 caracteres.")
    }
}