import { FindAddressByCepUseCase } from "../../domain/use-cases/cep/find-address-by-cep.use-case.js";
import CepRepository from "../../infra/repository/cep.repository.js";
import { CreateCepQueryHistoryUseCase } from "../../domain/use-cases/cep-query-history/create-cep-query-history.use-case.js";
import { CepQueryHistoryRepository } from "../../infra/repository/cep-query-history.repository.js";

class CepController {
  constructor() {
    this.cepRepository = new CepRepository();
    this.cepQueryHistoryRepository = new CepQueryHistoryRepository();
    this.cepUseCase = new FindAddressByCepUseCase(this.cepRepository);
    this.saveHistoryUseCase = new CreateCepQueryHistoryUseCase(this.cepQueryHistoryRepository);
  }

  async getCep(req, res) {
    const { cep } = req.params;
    let userId = null;

    if(req.user?.id) {
      userId = req.user.id
    }

    console.log('req', req);
    console.log("cep", cep);
    console.log('userId getCep -> ', userId);

    try {
      const data = await this.cepUseCase.execute(cep, userId);
      res.json({
        content: data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export { CepController };
