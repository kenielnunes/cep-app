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
  street: {
    type: DataTypes.STRING,
    allowNull: true
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
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