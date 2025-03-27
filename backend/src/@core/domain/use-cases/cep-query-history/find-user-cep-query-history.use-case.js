import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository.js";

class FindUserCepQueryHistoryUseCase {
  constructor() {
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
  }

  async execute(userId) {
    const existsCepQueryHistory = await this.cepQueryHistoryRepository.findQueriesByUser(userId)

    return existsCepQueryHistory;
  }
}

export { FindUserCepQueryHistoryUseCase }