import { CreateUserUseCase } from "../../domain/use-cases/user/create-user.use-case.js";
import UserRepository from "../../infra/repository/user.repository.js";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

async function createUser(req, res) {
  const body = req.body;

  try {
    const user = await createUserUseCase.execute(body);

    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    console.log('error',error);
    
    res.status(error.statusCode || 500).json({ message: error.message  });
  }
}

export { createUser };
