import express from 'express';
import { CepController } from '../@core/presentation/controllers/cep.controller.js';
import { optionalAuthMiddleware } from '../middlewares/optional-auth.middleware.js';

const cepRouter = express.Router();
const cepController = new CepController();

cepRouter.get('/:cep', optionalAuthMiddleware, (req, res, next) => cepController.getCep(req, res, next));

export { cepRouter }; 