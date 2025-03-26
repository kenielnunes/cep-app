import { UserAuthUseCase } from "../../domain/use-cases/auth/user-auth.use-case.js";
import UserRepository from "../../infra/repository/user.repository.js";

const userRepository = new UserRepository();
const userAuthUseCase = new UserAuthUseCase(userRepository);

async function loginUser(req, res) {
  const body = req.body;

  try {
    const auth = await userAuthUseCase.execute(body);

    console.log("auth", auth);

    res
      .status(200)
      .json({ message: "Autenticado com sucesso!", content: auth });
  } catch (error) {
    console.log("error", error);

    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export { loginUser };
