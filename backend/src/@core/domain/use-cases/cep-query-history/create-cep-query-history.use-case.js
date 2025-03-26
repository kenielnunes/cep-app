class CreateCepQueryHistoryUseCase {
  constructor(cepQueryHistoryRepository) {
    this.cepQueryHistoryRepository = cepQueryHistoryRepository;
  }

  async execute(userId, cep) {
    return await this.cepQueryHistoryRepository.create(userId, cep);
  }
}

export { CreateCepQueryHistoryUseCase };