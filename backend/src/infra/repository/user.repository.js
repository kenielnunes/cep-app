import { sequelize } from '../../config/database.js';
import { User } from '../../domain/models/user.js';

class UserRepository {
  async create(user) {
    console.log('user repo', user);

    const created = await User.create(user)

    return created
   
  }

  async findByUsername(username) {
    const user = await User.findOne({where: {username}})

    return user
  }
}

export default UserRepository;
