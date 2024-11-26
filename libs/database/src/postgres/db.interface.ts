import { FindOptionsOrder, FindOptionsWhere } from 'typeorm'

export interface IOrderObject {
  [key: string]: 'ASC' | 'DESC'
}

export interface IGetAndCountInput {
  page: number
  perPage: number
  order: IOrderObject
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
