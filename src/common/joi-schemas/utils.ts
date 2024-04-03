import { VALIDATION_MESSAGES } from '@utils/messages'
import * as Joi from 'joi'

// ******* Messages *******
export const invalidChoiceJoiMessage = (validValues: string[] | number[]) => ({
  'any.only': VALIDATION_MESSAGES.invalidChoice(null, validValues)
})

export const numberMinMaxJoiMessage = (min: number, max: number) => ({
  'number.min': VALIDATION_MESSAGES.mustBeGreaterThan(min),
  'number.max': VALIDATION_MESSAGES.mustBeLessThan(max)
})

export const stringMinMaxJoiMessage = (min: number, max: number) => ({
  'string.min': VALIDATION_MESSAGES.lengthMustBeGreaterThan(min),
  'string.max': VALIDATION_MESSAGES.lengthMustBeLessThan(max)
})

// ******* Schemas *******
export const enumJoiSchema = (enumValues: string[] | number[], type: 'string' | 'number' = 'string') =>
  Joi[type]()
    .valid(...enumValues)
    .messages(invalidChoiceJoiMessage(enumValues))

export const numberMinMaxJoiSchema = (min: number, max: number, isRequired: boolean = true) =>
  (isRequired ? Joi.number().required() : Joi.number()).min(min).max(max).messages(numberMinMaxJoiMessage(min, max))

export const stringMinMaxJoiSchema = (min: number, max: number, isRequired: boolean = true) =>
  (isRequired ? Joi.string().required() : Joi.string()).min(min).max(max).messages(stringMinMaxJoiMessage(min, max))
