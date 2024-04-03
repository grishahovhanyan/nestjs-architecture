import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'
import { SwaggerSuccess200 } from '@swagger/responses'
import { SWAGGER_SCHEMAS } from '@swagger/schemas'

export function SwaggerAuthRegister() {
  return applyDecorators(SwaggerSuccess200(), ApiBadRequestResponse(SWAGGER_SCHEMAS.registerValidationException))
}
