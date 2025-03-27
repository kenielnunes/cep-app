import { FindAddressByCepUseCase } from "../../domain/use-cases/cep/find-address-by-cep.use-case.js";

class CepController {
  constructor() {
    this.cepUseCase = new FindAddressByCepUseCase();
  }

  async getCep(req, res, next) {
    const { cep } = req.params;
    let userId = null;

    if(req.user?.id) {
      userId = req.user.id
    }
    try {
      const data = await this.cepUseCase.execute(cep, userId);
      res.json({
        content: data,
      });
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento
    }
  }
}

export { CepController };
