import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerProductsCreate() {
  return applyDecorators(
    ApiCreatedResponse(SWAGGER_SCHEMAS.getProductResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.createProductValidationException)
  )
}
