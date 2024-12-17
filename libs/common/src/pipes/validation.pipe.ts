import {
  Injectable,
  ValidationPipe as NestValidationPipe,
  ValidationPipeOptions,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { VALIDATION_MESSAGES } from '@app/common'

const constraintsToMessages = {
  isDefined: VALIDATION_MESSAGES.required,
  isBoolean: VALIDATION_MESSAGES.invalidBoolean,
  isInt: VALIDATION_MESSAGES.invalidInteger,
  isNumber: VALIDATION_MESSAGES.invalidNumber,
  isString: VALIDATION_MESSAGES.invalidString,
  isEmail: VALIDATION_MESSAGES.invalidEmail
}

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      transform: true, // Ensure incoming requests are transformed
      whitelist: true, // Strip out non-whitelisted properties
      transformOptions: { enableImplicitConversion: true },
      ...options
    })
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value
    }

    // Use class-transformer to instantiate the DTO
    const objectToValidate = plainToInstance(metadata.metatype, value)

    // Use class-validator to validate the object
    const errors = await validate(objectToValidate)

    if (errors.length > 0) {
      const formattedErrors = errors.reduce((obj, error) => {
        obj[error.property] = Object.entries(error.constraints || {}).map(
          ([key, value]) => constraintsToMessages[key] || value
        )
        return obj
      }, {})

      throw new BadRequestException(formattedErrors)
    }

    // Call the parent's transform method
    return super.transform(value, metadata)
  }
}
