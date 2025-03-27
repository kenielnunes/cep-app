import { CustomException } from "./custom-exception.js";

const errorHandler = (err, req, res, next) => {
  console.log('err instanceof -> ', (err instanceof CustomException));

  if (err instanceof CustomException) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};

export { errorHandler };
