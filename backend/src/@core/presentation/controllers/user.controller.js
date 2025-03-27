import { CreateUserUseCase } from "../../domain/use-cases/user/create-user.use-case.js";

class UserController {
  constructor() {
    this.createUserUseCase = new CreateUserUseCase();
  }

  async create(req, res) {
    const body = req.body;

    try {
      const user = await this.createUserUseCase.execute(body);

      res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { UserController };
