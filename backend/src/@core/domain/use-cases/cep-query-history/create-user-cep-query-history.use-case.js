import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository";

class CreateUserCepQueryHistoryUseCase {
  constructor() {
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
  }

  async execute(userId, cep) {
    return await this.cepQueryHistoryRepository.create(userId, cep);
  }
}

export { CreateUserCepQueryHistoryUseCase };