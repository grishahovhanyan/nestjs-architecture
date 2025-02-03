import { ConfigService } from '@nestjs/config'
import * as path from 'path'
import { DataSourceOptions } from 'typeorm'

const configService = new ConfigService()

const entities = [path.join(process.cwd(), 'dist', 'src', 'modules/**/*.entity{.ts,.js}')]

export const POSTGRES_CONFIGS: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: `${configService.get('POSTGRES_PASSWORD')}`,
  database: configService.get('POSTGRES_DATABASE'),
  entities,
  logging: configService.get('POSTGRES_LOGGING') === 'true',
  synchronize: configService.get('POSTGRES_SYNCHRONIZE') === 'true',
  dropSchema: configService.get('POSTGRES_DROP_SCHEMA') === 'true'
}
