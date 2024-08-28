import { BadRequestException as NestBadRequestException } from '@nestjs/common'

export class BadRequestException extends NestBadRequestException {
  constructor(e) {
    const error = typeof e === 'string' ? { nonFieldErrors: [e] } : e

    super(error)
  }
}
