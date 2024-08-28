import { Controller, Get } from '@nestjs/common'

import { SWAGGER_TAGS, SwaggerTag } from '@app/swagger'
import { Public } from '@app/common'

@SwaggerTag(SWAGGER_TAGS.App)
@Public()
@Controller()
export class AppController {
  @Get('healthcheck')
  index() {
    return 'Ok'
  }
}
