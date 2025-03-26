import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository.js";
import { CreateCepQueryHistoryUseCase } from "../cep-query-history/create-cep-query-history.use-case.js";

class FindAddressByCepUseCase {
  constructor(cepRepository) {
    this.cepRepository = cepRepository;
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
    this.saveHistoryUseCase = new CreateCepQueryHistoryUseCase(this.cepQueryHistoryRepository);
  }

  async execute(cep, userId) {
    const address = await this.cepRepository.findByCep(cep);

    if (userId) {
      await this.saveHistoryUseCase.execute(userId, cep);
    }

    return this.mapper(address);
  }

  mapper(address) {
    return {
      cep: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      unit: address.unidade,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
      stateName: address.estado,
      region: address.regiao,
      ibge: address.ibge,
      gia: address.gia,
      area: address.ddd,
      siafi: address.siafi,
    };
  }
}

export { FindAddressByCepUseCase };
