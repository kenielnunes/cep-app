import { HttpStatusCode } from "axios";
import jwt from 'jsonwebtoken'
import { CustomException } from "../../../../exceptions/custom-exception.js";
import UserRepository from "../../../infra/repository/user.repository.js";

export class UserAuthUseCase {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(body) {
    try {
      const { email, password } = body;
      
      // Busca o usuário
      const user = await this.userRepository.findByEmail(email);
      
      if (!user) {
        throw new CustomException(
         'Email ou senha inválidos!',
          HttpStatusCode.Unauthorized
        )
      }
      
      // Verifica a senha
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new CustomException(
          'Email ou senha inválidos!',
          HttpStatusCode.Unauthorized
        )
      }
      
      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    } catch (error) {
      throw error
    }
  }
}