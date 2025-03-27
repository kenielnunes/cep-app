import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository.js";

class ClearUserCepQueryHistoryUseCase {
  constructor() {
    this.clearingRepository = new CepQueryHistoryRepository();
  }

  async execute(userId) {
    return await this.clearingRepository.clearUserCepQueryHistory(userId);
  }
}

export { ClearUserCepQueryHistoryUseCase };
