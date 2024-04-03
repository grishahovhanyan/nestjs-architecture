import { applyDecorators } from '@nestjs/common'
import { ApiForbiddenResponse } from '@nestjs/swagger'
import { ERROR_MESSAGES } from '@utils/messages'

export function SwaggerForbidden403() {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden',
      schema: {
        type: 'object',
        example: {
          message: ERROR_MESSAGES.forbidden403
        }
      }
    })
  )
}
