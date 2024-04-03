import { IDbTables } from '@interfaces/db.interface'

export const DB_TABLES: IDbTables = {
  Users: 'users',
  Products: 'products'
}

export const DB_RELATIONS = {
  creator: 'creator',
  products: 'products'
}

export const REDIS_CONFIGS_KEY = 'REDIS_CONFIGS'
export const REDIS_CLIENT_KEY = 'REDIS_CLIENT'
