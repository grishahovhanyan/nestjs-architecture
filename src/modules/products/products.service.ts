import { Injectable } from '@nestjs/common'

import { IGetProductsInput, ICreateProductInput, IUpdateProductInput } from '@interfaces/product.interface'
import { IFindAndCountInput } from '@interfaces/db.interface'
import { DB_RELATIONS } from '@database/constants'
import { ProductsRepository } from './products.repository'

import { Product } from '@entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductInput: ICreateProductInput): Promise<Product> {
    return await this.productsRepository.create(createProductInput)
  }

  async getAndCount(getProductsInput: IGetProductsInput) {
    const { page, perPage, order, userId, category } = getProductsInput

    const findAndCountInput: IFindAndCountInput<Product> = {
      conditions: {
        createdBy: userId,
        ...(category ? { category } : {})
      },
      relations: [DB_RELATIONS.creator],
      take: perPage,
      skip: (page - 1) * perPage,
      order
    }
    return await this.productsRepository.findAndCount(findAndCountInput)
  }

  async getById(productId: number): Promise<Product | null> {
    return await this.productsRepository.findOne({ id: productId }, { relations: [DB_RELATIONS.creator] })
  }

  async updateById(productId: number, updateProductInput: IUpdateProductInput): Promise<Product | null> {
    await this.productsRepository.update({ id: productId }, updateProductInput)
    return await this.getById(productId)
  }

  async deleteById(productId: number) {
    await this.productsRepository.delete({ id: productId })
  }
}
