import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'
import { VALIDATION_MESSAGES } from '@utils/messages'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value) {
    this.schema = this.schema.messages({
      'any.required': VALIDATION_MESSAGES.required,
      'number.base': VALIDATION_MESSAGES.invalidNumber,
      'string.base': VALIDATION_MESSAGES.invalidString,
      'boolean.base': VALIDATION_MESSAGES.invalidBoolean,
      'array.base': VALIDATION_MESSAGES.invalidArray,
      'string.email': VALIDATION_MESSAGES.invalidEmail
    })

    if (typeof value === 'object') {
      const { error } = this.schema.validate(value)

      if (error) {
        const errors = error.details.reduce((obj: object, item) => {
          obj[item.path[0]] = [item.message]
          return obj
        }, {})

        throw new BadRequestException(errors)
      }
    }
    return value
  }
}
