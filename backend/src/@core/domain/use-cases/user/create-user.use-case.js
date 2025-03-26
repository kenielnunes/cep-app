import { HttpStatusCode } from "axios";
import { HttpException } from "../../../../exceptions/http-exception.js";

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    const data = await this.userRepository.create(user);

    return data;
  }
}

export { CreateUserUseCase }