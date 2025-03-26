import dotenv from 'dotenv';
dotenv.config();

// Função para validar se a variável de ambiente existe
const validateEnv = (env, envName) => {
  if (!env) {
    throw new Error(`A variável de ambiente ${envName} não foi definida`);
  }
  return env;
};

export const env = {
  CEP_EXTERNAL_URL_API: validateEnv(process.env.CEP_EXTERNAL_URL_API, 'CEP_EXTERNAL_URL_API'),
  JWT_SECRET: validateEnv(process.env.JWT_SECRET, 'JWT_SECRET'),
  HASH_CRYPTO_SECRET: validateEnv(process.env.HASH_CRYPTO_SECRET, 'HASH_CRYPTO_SECRET')
};
