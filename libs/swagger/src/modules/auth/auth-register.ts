import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS, SwaggerSuccess200 } from '@app/swagger'

export function SwaggerAuthRegister() {
  return applyDecorators(SwaggerSuccess200(), ApiBadRequestResponse(SWAGGER_SCHEMAS.registerValidationException))
}
