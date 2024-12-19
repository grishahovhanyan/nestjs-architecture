import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'
import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '@app/common'

export function SwaggerBadRequest400() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        type: 'object',
        oneOf: [
          {
            properties: {
              FIELD: {
                example: [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidEmail, '...']
              }
            }
          },
          {
            properties: {
              message: {
                example: `${ERROR_MESSAGES.userAlreadyExists} OR ${ERROR_MESSAGES.userAlreadyExists} ...`
              }
            }
          }
        ]
      }
    })
  )
}
