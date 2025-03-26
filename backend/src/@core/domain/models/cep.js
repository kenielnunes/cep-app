import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

const Cep = sequelize.define('Cep', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Cep já existente.'
    },
    set(value) {
      // Transformar o valor antes de salvar
      const transformedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      this.setDataValue('cep', transformedValue);
    },
    validate: {
      is: {
        args: [/^\d{8}$/],
        msg: 'O CEP deve ser um número de 8 dígitos, sem máscara.'
      }
    }
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true
  },
  unit: {
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
  stateName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  region: {
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