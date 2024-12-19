import { applyDecorators } from '@nestjs/common'
import { ApiNotFoundResponse } from '@nestjs/swagger'
import { ERROR_MESSAGES } from '@app/common'

export function SwaggerNotFound404() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Not Found',
      schema: {
        type: 'object',
        properties: { message: { example: ERROR_MESSAGES.notFound404 } }
      }
    })
  )
}
