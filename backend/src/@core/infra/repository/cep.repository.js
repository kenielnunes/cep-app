import axios from 'axios';
import { env } from '../../../config/env.config.js';
import { Cep } from '../../domain/models/cep.js';
import { NotFoundException } from '../../../exceptions/not-found-exception.js';
import { InternalServerErrorException } from '../../../exceptions/internal-server-error-exception.js';

class CepRepository {
  async findByCepExternalIntegration(cep) {
    try {
        const response = await axios.get(`${env.CEP_EXTERNAL_URL_API}/${cep}/json/`);
        const address = response.data;

        // Verifica se a resposta é um objeto e se contém os campos esperados
        if (typeof address !== 'object' || !address.logradouro || !address.bairro || !address.localidade) {
            throw new NotFoundException("CEP inválido ou não encontrado");
        }

        return address;
    } catch (error) {
        throw new InternalServerErrorException("CEP inválido.");
    }
  }

  async findByCep(cep) {
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
