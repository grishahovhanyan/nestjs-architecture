import { applyDecorators } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { SwaggerOptions } from './swagger.type'
import {
  SwaggerCustomResponse,
  SwaggerSuccess200,
  SwaggerCreated201,
  SwaggerBadRequest400,
  SwaggerUnauthorized401,
  SwaggerForbidden403,
  SwaggerNotFound404
} from './responses'

export function Swagger(options: SwaggerOptions): MethodDecorator {
  const { response, operation, description } = options

  const decorators = []

  if (operation) {
    decorators.push(ApiOperation({ summary: operation }))
  }

  if (response) {
    decorators.push(SwaggerCustomResponse(options))
  } else {
    decorators.push(options[201] ? SwaggerCreated201({ description }) : SwaggerSuccess200({ description }))
  }

  if (options[400]) {
    decorators.push(SwaggerBadRequest400())
  }

  if (options[401]) {
    decorators.push(SwaggerUnauthorized401())
  }

  if (options[403]) {
    decorators.push(SwaggerForbidden403())
  }

  if (options[404]) {
    decorators.push(SwaggerNotFound404())
  }

  return applyDecorators(...decorators)
}
