import { CepQueryHistory } from '../../domain/models/cep-query-history.js';

class CepQueryHistoryRepository {
  async create(userId, cep) {
    console.log('queryHistory', userId, cep);

    const created = await CepQueryHistory.create({
      userId, cep
    })

    return created
  }

  async findQueriesByUser(userId) {
    const queries = await CepQueryHistory.findAll({
      where: { userId },
      attributes: ['id', 'cep', 'createdAt']
    })

    return queries
  }

  async clearUserCepQueryHistory(userId) {
    console.log('Clearing history for userId:', userId);
    
    const result = await CepQueryHistory.destroy({
      where: { userId }
    });

    return result;
  }
}

export { CepQueryHistoryRepository };
