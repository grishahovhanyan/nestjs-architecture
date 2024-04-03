import { applyDecorators } from '@nestjs/common'
import { ApiNotFoundResponse } from '@nestjs/swagger'
import { ERROR_MESSAGES } from '@utils/messages'

export function SwaggerNotFound404() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Not Found',
      schema: {
        type: 'object',
        example: {
          message: ERROR_MESSAGES.notFound404
        }
      }
    })
  )
}
