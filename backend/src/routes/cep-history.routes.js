import express from 'express';
import { CepHistoryController } from '../@core/presentation/controllers/cep-history.controller.js';
import { validateDtoMiddleware } from '../middlewares/validate-dto.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const cepHistoryRouter = express.Router();
const cepHistoryController = new CepHistoryController();

// Rota para obter todo o histórico de CEPs consultados
cepHistoryRouter.get('/', 
authMiddleware,
(req, res) =>  cepHistoryController.getUserHistory(req, res));

// Rota para salvar uma nova consulta de CEP
cepHistoryRouter.post('/', (req, res) => cepHistoryController.saveCepSearch(req, res));

// Rota para limpar o histórico
cepHistoryRouter.delete('/', (req, res) =>  cepHistoryController.clearHistory(req, res));

export { cepHistoryRouter };
