import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Article, User } from './entities'

const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB } = process.env
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: +PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DB,
  synchronize: true,
  logging: true,
  entities: [Article, User],
})

export default AppDataSource.initialize()
  .then(() => console.log('database initialized'))
  .catch((er) => console.error(er))
