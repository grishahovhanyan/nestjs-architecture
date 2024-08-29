import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger'

import { SwaggerUnauthorized401 } from './responses'

export const SWAGGER_TAGS = {
  App: 'App',
  Auth: 'Auth',
  Users: 'Users'
}

export function SwaggerTag(tag: string) {
  return applyDecorators(ApiTags(tag))
}

export function SwaggerBearerAuth() {
  return applyDecorators(ApiBearerAuth())
}

export function SwaggerPrivateRoute(tagName: string) {
  return applyDecorators(SwaggerTag(tagName), SwaggerBearerAuth(), SwaggerUnauthorized401())
}
