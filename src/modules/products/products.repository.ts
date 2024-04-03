import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@common/base.repository'
import { Product } from '@entities/product.entity'

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req, Product)
  }
}
