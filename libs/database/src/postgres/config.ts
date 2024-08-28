import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'
import { POSTGRES_ENTITIES } from './entities'

const configService = new ConfigService()

export const POSTGRES_CONFIGS: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: `${configService.get('POSTGRES_PASSWORD')}`,
  database: configService.get('POSTGRES_DATABASE'),
  entities: POSTGRES_ENTITIES,
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  logging: configService.get('POSTGRES_LOGGING') === 'true',
  synchronize: configService.get('POSTGRES_SYNCHRONIZE') === 'true',
  dropSchema: configService.get('POSTGRES_DROP_SCHEMA') === 'true'
}
