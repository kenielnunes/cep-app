import UserRepository from "../../../infra/repository/user.repository.js";

class CreateUserUseCase {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(user) {
    const data = await this.userRepository.create(user);

    return data;
  }
}

export { CreateUserUseCase }