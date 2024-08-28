import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '@app/swagger'

export function SwaggerAuthLogin() {
  return applyDecorators(
    ApiOkResponse(SWAGGER_SCHEMAS.loginResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.loginValidationException)
  )
}
