import * as Joi from 'joi'

export const createProductJoiSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required()
}).options({ abortEarly: false })

export const updateProductJoiSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
  price: Joi.number(),
  description: Joi.string()
}).options({ abortEarly: false })
