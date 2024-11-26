import 'tsconfig-paths/register'
import 'dotenv/config'
import * as path from 'path'
import { DataSource } from 'typeorm'

const entities = [path.join(process.cwd(), 'src', 'modules/**/entities/*.entity{.ts,.js}')]
const migrations = [path.join(__dirname, 'migrations', '*{.ts,.js}')]

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: process.env.POSTGRES_DATABASE,
  entities,
  migrations,
  logging: process.env.POSTGRES_LOGGING === 'true',
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
  dropSchema: process.env.POSTGRES_DROP_SCHEMA === 'true'
})
