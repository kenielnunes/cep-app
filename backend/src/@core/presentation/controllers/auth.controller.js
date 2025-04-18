import { UserAuthUseCase } from "../../domain/use-cases/auth/user-auth.use-case.js";

class AuthController {
  constructor() {
    this.userAuthUseCase = new UserAuthUseCase();
  }

  async login(req, res) {
    const body = req.body;

    try {
      const auth = await this.userAuthUseCase.execute(body);

      res
        .status(200)
        .json({ message: "Autenticado com sucesso!", content: auth });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { AuthController };
