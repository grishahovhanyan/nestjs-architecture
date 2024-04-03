import { ForbiddenException } from '@nestjs/common'
import { ERROR_MESSAGES } from '@utils/messages'

export class Forbidden extends ForbiddenException {
  constructor() {
    super({ message: ERROR_MESSAGES.forbidden403 })
  }
}
