import { BadRequestException } from '@nestjs/common'

export class BadRequest extends BadRequestException {
  constructor(e) {
    const error = typeof e === 'string' ? { nonFieldErrors: [e] } : e

    super(error)
  }
}
