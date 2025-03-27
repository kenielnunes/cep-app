import { Sequelize } from 'sequelize'
import dotenv from "dotenv";

dotenv.config({ path: ['../.env', '../../../.env'] })
const sequelize = new Sequelize(
  process.env.POSTGRES_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export { sequelize };
