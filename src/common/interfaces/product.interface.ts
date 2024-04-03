import { IOrderObject } from './db.interface'

export interface IGetProductsInput {
  page: number
  perPage: number
  order: IOrderObject
  userId: number
  category?: string
}

export interface ICreateProductInput {
  createdBy: number
  name: string
  category: string
  price: number
  description: string
}

export interface IUpdateProductInput {
  name: string
  category: string
  price: number
  description: string
}
