import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Cep = sequelize.define('Cep', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  localidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ibge: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ddd: {
    type: DataTypes.STRING,
    allowNull: true
  },
  siafi: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastUpdated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true, 
  tableName: "cep", 
});

export { Cep }