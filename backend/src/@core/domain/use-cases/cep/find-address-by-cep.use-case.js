import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository.js";
import { CreateCepQueryHistoryUseCase } from "../cep-query-history/create-cep-query-history.use-case.js";

class FindAddressByCepUseCase {
  constructor(cepRepository) {
    this.cepRepository = cepRepository;
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
    this.saveHistoryUseCase = new CreateCepQueryHistoryUseCase(this.cepQueryHistoryRepository);
  }

  async execute(cep, userId) {
    // verifica se o cep ja existe no banco de dados
    const cepInDb = await this.cepRepository.findByCep(cep);

    console.log('cepInDb -> ', cepInDb);

    if (cepInDb) {
      // Salva no histórico se o usuário estiver logado
      if (userId) {
        await this.saveHistoryUseCase.execute(userId, cep);
      }

      return cepInDb
    }

    // se não existir no banco de dados, busca da integração externa e cadastra no banco
    const address = await this.cepRepository.findByCepExternalIntegration(cep);

    await this.cepRepository.create(address);

    // Salva no histórico se o usuário estiver logado
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
