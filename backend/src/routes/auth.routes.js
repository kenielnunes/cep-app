import express from 'express';
import { AuthController } from '../@core/presentation/controllers/auth.controller.js';
import { validateDtoMiddleware } from '../middlewares/validate-dto.middleware.js';
import { AuthUserSchema } from '../validations/auth/auth-user.schema.js';

const authRouter = express.Router();
const authController = new AuthController();

// Rota para autenticação do usuário
authRouter.post('/', validateDtoMiddleware(AuthUserSchema), (req, res) => authController.login(req, res));

export { authRouter }; 