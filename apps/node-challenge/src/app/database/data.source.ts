import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Article, User } from './entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1981',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Article, User],
})

export default AppDataSource.initialize()
  .then(() => console.log('database initialized'))
  .catch((er) => console.error(er))
