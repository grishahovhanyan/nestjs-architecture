import { Controller, Get } from '@nestjs/common'

import { SWAGGER_TAGS, SwaggerTag } from '@swagger/utils'

import { Public } from '@decorators/public.decorator'

@SwaggerTag(SWAGGER_TAGS.App)
@Public()
@Controller()
export class AppController {
  @Get('healthcheck')
  index() {
    return 'Ok'
  }
}
