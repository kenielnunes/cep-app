import { HttpStatusCode } from "axios";
import { HttpException } from "../../../exceptions/http-exception.js";
import jwt from 'jsonwebtoken'

export class UserAuthUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(body) {
    try {
      const { email, password } = body;
      
      // Busca o usuário
      const user = await this.userRepository.findByEmail(email);
      
      if (!user) {
        throw new HttpException({
          type: 'invalid_credentials',
          message: 'Email ou senha inválidos!',
          statusCode: HttpStatusCode.Unauthorized
        })
      }
      
      // Verifica a senha
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new HttpException({
          type: 'invalid_credentials',
          message: 'Email ou senha inválidos!',
          statusCode: HttpStatusCode.Unauthorized
        })
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