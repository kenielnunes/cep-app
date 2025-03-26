import express from 'express';
import { UserController } from '../@core/presentation/controllers/user.controller.js';
import { validateDtoMiddleware } from '../middlewares/validate-dto.middleware.js';
import { CreateUserSchema } from '../validations/user/create-user.schema.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', validateDtoMiddleware(CreateUserSchema), (req, res) => userController.create(req, res));

export { userRouter };
