import { Get } from '@nestjs/common'
import { EnhancedController } from '@app/common'

@EnhancedController('', false, 'App')
export class AppController {
  @Get('healthcheck')
  index() {
    return 'Ok'
  }
}
