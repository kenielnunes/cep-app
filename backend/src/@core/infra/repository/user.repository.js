import { User } from '../../domain/models/user.js';

class UserRepository {
  async create(user) {
    console.log('user repo', user);

    const created = await User.create(user)

    return created
   
  }

  async findByUsername(username) {
    const user = await User.findOne({ where: { username } })

    return user
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } })

    return user
  }
}

export default UserRepository;
