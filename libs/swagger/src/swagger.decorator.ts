import { applyDecorators } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import {
  SwaggerBadRequest400,
  SwaggerCreated201,
  SwaggerCustomResponse,
  SwaggerForbidden403,
  SwaggerNotFound404,
  SwaggerSuccess200,
  SwaggerUnauthorized401
} from './responses'
import { SwaggerOptions } from './swagger.type'

export function Swagger(options: SwaggerOptions): MethodDecorator {
  const { response, operation, description, errorResponses = [] } = options

  const decorators = []

  if (operation) {
    decorators.push(ApiOperation({ summary: operation }))
  }

  if (response) {
    decorators.push(SwaggerCustomResponse(options))
  } else {
    decorators.push(options[201] ? SwaggerCreated201({ description }) : SwaggerSuccess200({ description }))
  }

  if (errorResponses.includes(400) || options[400]) {
    decorators.push(SwaggerBadRequest400())
  }

  if (errorResponses.includes(401) || options[401]) {
    decorators.push(SwaggerUnauthorized401())
  }

  if (errorResponses.includes(403) || options[403]) {
    decorators.push(SwaggerForbidden403())
  }

  if (errorResponses.includes(404) || options[404]) {
    decorators.push(SwaggerNotFound404())
  }

  return applyDecorators(...decorators)
}
