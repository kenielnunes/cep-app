import { HttpStatusCode } from "axios";
import { HttpException } from "../../../exceptions/http-exception.js";

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    if(!user.email) {
      throw new HttpException({
        type: "invalid_email",
        message: "Email inválido.",
        statusCode: HttpStatusCode.BadRequest
      })
    }

    const existsUser = await this.userRepository.findByUsername(user.username)

    if(existsUser) {
      throw new HttpException({
        type: "invalid_username",
        message: "Já existe um usuário com esse nome",
        statusCode: HttpStatusCode.Conflict
      })
    }

    const data = await this.userRepository.create(user);

    return data;
  }
}

export { CreateUserUseCase }