import * as path from 'path'
import { ConfigService } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

const configService = new ConfigService()

export const databaseConfigs: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: `${configService.get('DB_PASSWORD')}`,
  database: configService.get('DB_NAME'),
  entities: [path.join(__dirname, 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  logging: configService.get('DB_LOGGING') === 'true',
  synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
  dropSchema: configService.get('DB_DROP_SCHEMA') === 'true',
  extra: {
    max: +configService.get('DB_MAX_CONNECTIONS') || 20
  }
}

export const authRedisConfigs = {
  url: configService.get('AUTH_REDIS_URL')
}
