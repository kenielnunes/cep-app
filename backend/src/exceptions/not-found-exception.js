import { HttpStatusCode } from "axios";
import { CustomException } from "./custom-exception.js";

export class NotFoundException extends CustomException {
  constructor(message = "Recurso não encontrado") {
    super(message,HttpStatusCode.NotFound);
  }
}