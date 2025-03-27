import { ClearUserCepQueryHistoryUseCase } from "../../domain/use-cases/cep-query-history/clear-user-cep-query-history.use-case.js";
import { FindUserCepQueryHistoryUseCase } from "../../domain/use-cases/cep-query-history/find-user-cep-query-history.use-case.js";

class CepHistoryController {
  constructor() {
    this.findUserCepQueryHistoryUseCase = new FindUserCepQueryHistoryUseCase();
    this.clearUserCepQueryHistoryUseCase = new ClearUserCepQueryHistoryUseCase();
  }

  async getUserHistory(req, res) {
    try {
      const userId = req.user.id;

      // busca o historico de busca do usuario pelo id do jwt
      const result = await this.findUserCepQueryHistoryUseCase.execute(userId);

      console.log('result -> ', result);

      return res.status(200).json({ content: result });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async clearUserHistory(req, res) {
    try {
      const userId = req.user.id;

      // Limpa o histórico de busca do usuário pelo id do jwt
      await this.clearUserCepQueryHistoryUseCase.execute(userId);

      return res.status(200).json({ message: 'Histórico de consultas limpo com sucesso.' });
    } catch (error) {
      throw error
    }
  }
}

export { CepHistoryController }
