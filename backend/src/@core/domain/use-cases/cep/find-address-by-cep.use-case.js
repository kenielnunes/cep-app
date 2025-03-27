import { CustomException } from "../../../../exceptions/custom-exception.js";
import { NotFoundException } from "../../../../exceptions/not-found-exception.js";
import { CepQueryHistoryRepository } from "../../../infra/repository/cep-query-history.repository.js";
import CepRepository from "../../../infra/repository/cep.repository.js";

class FindAddressByCepUseCase {
  constructor() {
    this.cepRepository = new CepRepository();
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
  }

  async execute(cep, userId) {
    // verifica se o cep ja existe no banco de dados
    const cepInDb = await this.cepRepository.findByCep(cep);

    if (cepInDb) {
      // Salva no histórico se o usuário estiver logado
      if (userId) {
        await this.cepQueryHistoryRepository.create(userId, cep);
      }

      return cepInDb
    }

    // se não existir no banco de dados, busca da integração externa e cadastra no banco
    const address = await this.cepRepository.findByCepExternalIntegration(cep);

    await this.cepRepository.create(address);

    // Salva no histórico se o usuário estiver logado
    if (userId) {
      await this.cepQueryHistoryRepository.create(userId, cep);
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
