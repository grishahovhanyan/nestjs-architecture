import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'

export function SwaggerCreated201(options?: { description?: string }) {
  return applyDecorators(
    ApiCreatedResponse({
      description: options?.description ?? 'Created',
      schema: {
        type: 'object',
        properties: { message: { example: 'created' } }
      }
    })
  )
}
