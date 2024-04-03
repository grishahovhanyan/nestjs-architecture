import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { PRODUCTS_SORT_FIELDS } from '@utils/constants'
import { getOrderingDescription, productProperties } from '@swagger/schema-properties'
import { SwaggerQueryParam } from '@swagger/utils'
import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerProductsIndex() {
  return applyDecorators(
    SwaggerQueryParam('page'),
    SwaggerQueryParam('perPage'),
    SwaggerQueryParam('ordering', false, getOrderingDescription(PRODUCTS_SORT_FIELDS)),
    SwaggerQueryParam('category', false),
    ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(productProperties))
  )
}
