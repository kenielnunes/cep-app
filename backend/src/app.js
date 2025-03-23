const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("conectado ao db");
    await sequelize.sync();
    console.log("db sync");
  } catch (error) {
    console.error("erro ao conectar ao db -> ", error);
    process.exit(1);
  }
};

module.exports = { app, connectDB };
