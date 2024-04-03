import { UnauthorizedException } from '@nestjs/common'
import { ERROR_MESSAGES } from '@utils/messages'

export class Unauthorized extends UnauthorizedException {
  constructor() {
    super({ message: ERROR_MESSAGES.unauthorized401 })
  }
}
