import { FindUserCepQueryHistoryUseCase } from "../../domain/use-cases/cep-query-history/find-user-cep-query-history.use-case.js";
import { CepQueryHistoryRepository } from "../../infra/repository/cep-query-history.repository.js";

class CepHistoryController {
  constructor() {
    this.cepHistoryRepository = new CepQueryHistoryRepository()
    this.findUserCepQueryHistoryUseCase = new FindUserCepQueryHistoryUseCase(this.cepHistoryRepository);
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
}

export { CepHistoryController }
