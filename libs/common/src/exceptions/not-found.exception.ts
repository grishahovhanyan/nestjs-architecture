import { NotFoundException as NestNotFoundException } from '@nestjs/common'
import { ERROR_MESSAGES } from '@app/common'

export class NotFoundException extends NestNotFoundException {
  constructor() {
    super({ message: ERROR_MESSAGES.notFound404 })
  }
}
