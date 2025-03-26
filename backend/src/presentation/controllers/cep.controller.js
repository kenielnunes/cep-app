import { FindAddressByCepUseCase } from "../../domain/use-cases/cep/find-address-by-cep.use-case.js";
import CepRepository from "../../infra/repository/cep.repository.js";

const cepRepository = new CepRepository();
const cepUseCase = new FindAddressByCepUseCase(cepRepository);

async function getCep(req, res) {
  const { cep } = req.params;

  console.log("cep", cep);

  try {
    const data = await cepUseCase.execute(cep);
    res.json({
      content: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getCep };
