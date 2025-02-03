import { UnauthorizedException as NestUnauthorizedException } from '@nestjs/common'

import { ERROR_MESSAGES } from '@app/common'

export class UnauthorizedException extends NestUnauthorizedException {
  constructor() {
    super({ message: ERROR_MESSAGES.unauthorized401 })
  }
}
