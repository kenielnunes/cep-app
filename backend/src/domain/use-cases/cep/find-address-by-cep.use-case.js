class FindAddressByCepUseCase {
  constructor(cepRepository) {
    this.cepRepository = cepRepository;
  }

  async execute(cep) {
    const address = await this.cepRepository.findByCep(cep);
    return this.mapper(address);
  }

  mapper(address) {
    return {
      zipCode: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      unit: address.unidade,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
      stateName: address.estado,
      region: address.regiao,
      ibgeCode: address.ibge,
      giaCode: address.gia,
      areaCode: address.ddd,
      siafiCode: address.siafi,
    };
  }
}

export { FindAddressByCepUseCase };
