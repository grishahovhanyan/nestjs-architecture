import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

export function SwaggerSuccess200(options?: { description?: string }) {
  return applyDecorators(
    ApiOkResponse({
      description: options?.description ?? 'Success',
      schema: {
        type: 'object',
        properties: { message: { example: 'success' } }
      }
    })
  )
}
