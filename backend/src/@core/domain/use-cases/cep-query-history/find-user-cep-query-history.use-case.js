class FindUserCepQueryHistoryUseCase {
  constructor(cepQueryHistoryRepository) {
    this.cepQueryHistoryRepository = cepQueryHistoryRepository;
  }

  async execute(userId) {
    const existsCepQueryHistory = await this.cepQueryHistoryRepository.findQueriesByUser(userId)

    return existsCepQueryHistory;
  }
}

export { FindUserCepQueryHistoryUseCase }