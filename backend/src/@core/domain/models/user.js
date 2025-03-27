import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../../../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   len: {
    //     args: [6],
    //     msg: 'A senha deve ter no mínimo 6 caracteres.'
    //   }
    // }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Já existe um usuario com esse email.',
    },
    validate: {
      isEmail: true,
    }
  }
}, {
  timestamps: true,
  tableName: "user",
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  }
});

// Método para comparar senha
User.prototype.comparePassword = function(password) {
  
  return bcrypt.compareSync(password, this.password);
};


export { User }