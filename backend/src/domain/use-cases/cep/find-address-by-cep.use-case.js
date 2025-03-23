class FindAddressByCepUseCase {
  constructor(cepRepository) {
    this.cepRepository = cepRepository;
  }

  async execute(cep) {
    const data = await this.cepRepository.findByCep(cep);
    return data;
  }
}

export { FindAddressByCepUseCase }