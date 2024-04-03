import { Controller, Get, Post, Query, Body, Param, Put, Delete } from '@nestjs/common'
import { SWAGGER_TAGS } from '@swagger/utils'
import { SwaggerPrivateRoute } from '@swagger/utils'
import { SwaggerProducts } from '@swagger/products'

import { RequestUser } from '@decorators/user.decorator'
import { ProductsValidation } from '@validators/product.validator'
import { Forbidden, NotFound } from '@exceptions/index'
import { PAGE_SIZE_TYPES, getPageSize, paginatedResponse } from '@utils/pagination'
import { PRODUCTS_SORT_FIELDS } from '@utils/constants'
import { getSortOrderFromQuery } from '@utils/helpers'
import { SUCCESS_RESPONSE } from '@utils/messages'
import { IGetProductsQuery } from '@interfaces/request.interface'
import { IGetProductsInput } from '@interfaces/product.interface'
import { CreateProductDto, UpdateProductDto } from '@dto/product.dto'

import { ProductsService } from './products.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Products)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @SwaggerProducts.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: IGetProductsQuery) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.products, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], PRODUCTS_SORT_FIELDS)

    const getAndCountInput: IGetProductsInput = {
      page,
      perPage,
      order,
      userId: currentUserId,
      category: query.category
    }

    const { items, totalCount } = await this.productsService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }

  @SwaggerProducts.create()
  @Post()
  @ProductsValidation.create()
  async create(@RequestUser('id') currentUserId: number, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create({ createdBy: currentUserId, ...createProductDto })

    return product
  }

  @SwaggerProducts.find()
  @Get(':id')
  async find(@Param('id') productId: number) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFound()
    }

    return product
  }

  @SwaggerProducts.update()
  @Put(':id')
  @ProductsValidation.update()
  async update(
    @RequestUser('id') currentUserId: number,
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFound()
    }
    if (product.createdBy !== currentUserId) {
      throw new Forbidden()
    }

    const updatedProduct = await this.productsService.updateById(productId, updateProductDto)

    return updatedProduct
  }

  @SwaggerProducts.delete()
  @Delete(':id')
  async delete(@RequestUser('id') currentUserId: number, @Param('id') productId: number) {
    const product = await this.productsService.getById(productId)

    if (!product) {
      throw new NotFound()
    }

    if (product.createdBy !== currentUserId) {
      throw new Forbidden()
    }

    await this.productsService.deleteById(productId)

    return SUCCESS_RESPONSE
  }
}
