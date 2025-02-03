import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'

import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '@app/common'

export function SwaggerBadRequest400() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        type: 'object',
        oneOf: [
          {
            properties: {
              message: {
                example: `${ERROR_MESSAGES.userAlreadyExists} OR ${ERROR_MESSAGES.invalidEmailPassword} ...`
              }
            }
          },
          {
            properties: {
              FIELD: {
                example: [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidEmail, '...']
              }
            }
          }
        ]
      }
    })
  )
}
