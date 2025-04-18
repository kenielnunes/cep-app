import { DataTypes } from 'sequelize';
import { User } from './user.js';
import { sequelize } from '../../../config/database.js';

const CepQueryHistory = sequelize.define('CepQueryHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: "cep_query", 
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['cep']
    }
  ]
});

// Estabelecer relações
User.hasMany(CepQueryHistory, { foreignKey: 'userId' });
CepQueryHistory.belongsTo(User, { foreignKey: 'userId' });

export { CepQueryHistory }