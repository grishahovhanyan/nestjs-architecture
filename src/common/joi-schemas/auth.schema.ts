import * as Joi from 'joi'
import { VALIDATION_MESSAGES } from '@utils/messages'
import { stringMinMaxJoiSchema } from './utils'

export const registerJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: stringMinMaxJoiSchema(8, 20),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
})
  .options({ abortEarly: false })
  .messages({ 'any.only': VALIDATION_MESSAGES.passwordMismatch })

export const loginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).options({ abortEarly: false })
