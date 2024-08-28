import { ForbiddenException as NestForbiddenException } from '@nestjs/common'
import { ERROR_MESSAGES } from '@app/common'

export class ForbiddenException extends NestForbiddenException {
  constructor() {
    super({ message: ERROR_MESSAGES.forbidden403 })
  }
}
