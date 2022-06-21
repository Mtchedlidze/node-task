import { v4 as randomID } from 'uuid'
import { IUser } from '../common/interfaces'
import { UserRepository } from '../database/repositories/user.repository'
import { PasswordService } from './password.service'
export class UserService {
  private readonly userReposotory: UserRepository
  private readonly passwordService: PasswordService
  constructor() {
    this.userReposotory = new UserRepository()
    this.passwordService = new PasswordService()
  }

  public async create(user: IUser) {
    const userExists = await this.userReposotory.findOne({
      username: user.username,
    })
    if (userExists) {
      throw new Error('user with this username already exists')
    }
    const password = await this.passwordService.encryptPassword(user.password)
    user.id = randomID()
    return this.userReposotory.create({ ...user, password })
  }

  public async findOne(id?: string, username?: string) {
    const user = await this.userReposotory.findOne({ id, username })

    if (!user) {
      throw new Error('user not found')
    }

    delete user.password

    return user
  }
}
