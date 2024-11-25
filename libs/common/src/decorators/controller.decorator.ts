import { applyDecorators, Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { upperFirst } from 'lodash'
import { SwaggerUnauthorized401 } from '@app/swagger'
import { Public } from './public.decorator'

export function EnhancedController(prefix: string, secured = true, swaggerTag = ''): ClassDecorator {
  const swaggerTagFromPrefix = !prefix.includes('/')
    ? upperFirst(prefix)
    : prefix
        .split('/')
        .map((item) => upperFirst(item))
        .join('')

  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [
    ApiTags(swaggerTag || swaggerTagFromPrefix),
    Controller(prefix)
  ]

  if (secured) {
    decorators.push(ApiBearerAuth(), SwaggerUnauthorized401())
  } else {
    decorators.push(Public())
  }

  return applyDecorators(...decorators)
}
