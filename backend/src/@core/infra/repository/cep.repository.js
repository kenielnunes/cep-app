import axios from 'axios';
import { env } from '../../../config/env.config.js';
import { Cep } from '../../domain/models/cep.js';

class CepRepository {
  async findByCepExternalIntegration(cep) {
    try {
      const response = await axios.get(`${env.CEP_EXTERNAL_URL_API}/${cep}/json/`);

      const address = response.data

      return address
    } catch (error) {
      throw error
    }
  }

  async findByCep(cep) {
    console.log('cep -> ', cep);
    const address = await Cep.findOne({
        where: { cep },
        attributes: { exclude: [] } // Inclui todos os atributos
    });

   
    return address;
  }

  async create(address) {
    try {
      const newAddress = await Cep.create({
        cep: address.cep,
        street: address.logradouro,
        complement: address.complemento,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
        stateName: address.estado,
        unit: address.unidade,
        ibge: address.ibge,
        gia: address.gia,
        ddd: address.ddd,
        siafi: address.siafi,
      }, );

      return newAddress;
    } catch (error) {
      throw error
    }
  }
}

export default CepRepository;
