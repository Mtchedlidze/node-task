import { IUser } from '../../common/interfaces'
import { AppDataSource } from '../data.source'
import { User } from '../entities'
import { FindOptionsWhere } from 'typeorm'

export class UserRepository {
  private readonly userRepository = AppDataSource.getRepository(User)

  public create(user: IUser) {
    const createdArticle = new User()
    Object.assign(createdArticle, user)
    return this.userRepository.save(createdArticle)
  }

  public findOne({ username, id }: FindOptionsWhere<User>) {
    return this.userRepository.findOne({ where: { username, id } })
  }
}
