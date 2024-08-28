import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

export function SwaggerSuccess200() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Success',
      schema: {
        type: 'object',
        properties: {
          message: {
            example: 'success'
          }
        }
      }
    })
  )
}
