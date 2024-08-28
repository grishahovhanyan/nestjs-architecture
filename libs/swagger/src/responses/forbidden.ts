import { applyDecorators } from '@nestjs/common'
import { ApiForbiddenResponse } from '@nestjs/swagger'
import { ERROR_MESSAGES } from '@app/common'

export function SwaggerForbidden403() {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'ForbiddenException',
      schema: {
        type: 'object',
        example: {
          message: ERROR_MESSAGES.forbidden403
        }
      }
    })
  )
}
