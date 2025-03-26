import axios from 'axios';
import { env } from '../../../config/env.config.js';

class CepRepository {
  async findByCep(cep) {
    console.log('cep repo', cep);
    
    try {
      const response = await axios.get(`${env.CEP_EXTERNAL_URL_API}/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching CEP data');
    }
  }
}

export default CepRepository;
