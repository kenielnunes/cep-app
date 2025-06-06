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
  POSTGRES_USER: validateEnv(process.env.POSTGRES_USER, 'POSTGRES_USER'),
  POSTGRES_PASSWORD: validateEnv(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD'),
  POSTGRES_DB: validateEnv(process.env.POSTGRES_DB, 'POSTGRES_DB'),
  POSTGRES_HOST: validateEnv(process.env.POSTGRES_HOST, 'POSTGRES_HOST'),
  POSTGRES_PORT: validateEnv(process.env.POSTGRES_PORT, 'POSTGRES_PORT'),
  CEP_EXTERNAL_URL_API: validateEnv(process.env.CEP_EXTERNAL_URL_API, 'CEP_EXTERNAL_URL_API'),
  JWT_SECRET: validateEnv(process.env.JWT_SECRET, 'JWT_SECRET'),
  HASH_CRYPTO_SECRET: validateEnv(process.env.HASH_CRYPTO_SECRET, 'HASH_CRYPTO_SECRET')
};
