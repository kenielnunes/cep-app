import { HttpStatusCode } from "axios";
import { HttpException } from "../../../exceptions/http-exception.js";
import jwt from 'jsonwebtoken'

export class UserAuthUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(body) {
    try {
      const { username, password } = body;
      
      // Validações básicas
      if (!username || !password) {
        return HttpException({
          type: 'invalid_body',
          message: 'Preencha todos os campos!',
          statusCode: HttpStatusCode.BadRequest
        })
      }
      
      // Buscar o usuário
      const user = await this.userRepository.findByUsername(username);
      
      if (!user) {
        return HttpException({
          type: 'invalid_body',
          message: 'Preencha todos os campos!',
          statusCode: HttpStatusCode.Unauthorized
        })
      }
      
      // Verificar a senha
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new HttpException({
          type: 'unauthorized',
          message: 'Usuário ou senha inválidos',
          statusCode: HttpStatusCode.Unauthorized
        })
      }
      
      // Gerar token JWT
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