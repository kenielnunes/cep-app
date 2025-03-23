import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { User } from './user.js';

const CepQuery = sequelize.define('CepQuery', {
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
  queryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
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
User.hasMany(CepQuery, { foreignKey: 'userId' });
CepQuery.belongsTo(User, { foreignKey: 'userId' });

export { CepQuery }