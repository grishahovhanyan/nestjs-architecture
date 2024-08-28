import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { VALIDATION_MESSAGES } from '@app/common'

const constraintsToMessages = {
  isDefined: VALIDATION_MESSAGES.required,
  match: VALIDATION_MESSAGES.passwordMismatch,
  isBoolean: VALIDATION_MESSAGES.invalidBoolean,
  isInt: VALIDATION_MESSAGES.invalidInteger,
  isNumber: VALIDATION_MESSAGES.invalidNumber,
  isString: VALIDATION_MESSAGES.invalidString,
  isEmail: VALIDATION_MESSAGES.invalidEmail
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const objectToValidate = plainToInstance(metatype, value)
    const errors = await validate(objectToValidate)

    if (errors.length > 0) {
      const responseError = errors.reduce(
        (obj, error) => ({
          ...obj,
          [error.property]: Object.entries(error.constraints).map(([key, value]) => constraintsToMessages[key] || value)
        }),
        {}
      )

      throw new BadRequestException(responseError)
    }

    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
