import { SORT_DIRECTIONS } from '@utils/constants'
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm'

export interface IDbTables {
  Users: 'users'
  Products: 'products'
}

export interface IOrderObject {
  [key: string]: keyof typeof SORT_DIRECTIONS
}

export interface IFindAndCountInput<T> {
  conditions: FindOptionsWhere<T>
  relations?: string[]
  take: number
  skip: number
  order?: FindOptionsOrder<T>
}

export interface IFindAndCountOutput<T> {
  items: T[]
  totalCount: number
}

export interface IFindInput {
  relations?: string[]
}
