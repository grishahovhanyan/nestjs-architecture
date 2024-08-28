import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS, userProperties } from '@app/swagger'

export function SwaggerUsersIndex() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(userProperties)))
}
