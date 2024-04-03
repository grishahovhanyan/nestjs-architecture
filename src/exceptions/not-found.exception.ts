import { NotFoundException } from '@nestjs/common'
import { ERROR_MESSAGES } from '@utils/messages'

export class NotFound extends NotFoundException {
  constructor() {
    super({ message: ERROR_MESSAGES.notFound404 })
  }
}
