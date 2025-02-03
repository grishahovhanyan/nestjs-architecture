import { applyDecorators } from '@nestjs/common'
import { ApiUnauthorizedResponse } from '@nestjs/swagger'

import { ERROR_MESSAGES } from '@app/common'

export function SwaggerUnauthorized401() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: { message: { example: ERROR_MESSAGES.unauthorized401 } }
      }
    })
  )
}
