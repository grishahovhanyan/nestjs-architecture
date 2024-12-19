import { ApiExtraModels, getSchemaPath, ApiResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'
import { applyDecorators, HttpStatus } from '@nestjs/common'
import { PaginationResponseDto } from '@app/common'
import { SwaggerOptions } from '../swagger.type'

export function SwaggerCustomResponse(options: SwaggerOptions): MethodDecorator {
  const { response, pagination, isArray, description } = options

  const decorators = []

  if (!pagination && !isArray) {
    decorators.push(
      options[201]
        ? ApiCreatedResponse({ type: response, description })
        : ApiOkResponse({ type: response, description })
    )
  } else {
    const itemsSchema = {
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(response) }
        }
      }
    }

    decorators.push(
      ...(pagination ? [ApiExtraModels(PaginationResponseDto)] : []),
      ApiExtraModels(response),
      ApiResponse({
        status: HttpStatus.OK,
        description,
        schema: {
          allOf: [...(pagination ? [{ $ref: getSchemaPath(PaginationResponseDto) }] : []), itemsSchema]
        }
      })
    )
  }

  return applyDecorators(...decorators)
}
