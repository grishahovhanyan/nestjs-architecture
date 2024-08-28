import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS, SwaggerNotFound404 } from '@app/swagger'

export function SwaggerUsersFind() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.getUserResponse), SwaggerNotFound404())
}
