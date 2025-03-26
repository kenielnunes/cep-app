import { HttpStatusCode } from "axios";

const validateDtoMiddleware = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    // Pega o primeiro erro disponível
    const firstErrorEntry = Object.values(parsed.error.format()).find((err) => err?._errors?.length);
    const firstErrorMessage = firstErrorEntry ? firstErrorEntry._errors[0] : "Erro de validação";

    return res.status(HttpStatusCode.BadRequest).json({ message: firstErrorMessage });
  }

  next();
};

export { validateDtoMiddleware }