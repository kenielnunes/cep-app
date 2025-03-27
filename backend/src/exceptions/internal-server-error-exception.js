import { HttpStatusCode } from "axios";
import { CustomException } from "./custom-exception.js";

export class InternalServerErrorException extends CustomException {
  constructor(message = "Erro interno no servidor") {
    super(message ,HttpStatusCode.InternalServerError);
  }
}