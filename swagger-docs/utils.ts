import * as Joi from 'joi'
import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger'

import { SwaggerUnauthorized401 } from './responses'
import { VALIDATION_MESSAGES } from '@utils/messages'

export const SWAGGER_TAGS = {
  App: 'App',
  Auth: 'Auth',
  Users: 'Users',
  Products: 'Products'
}

export function SwaggerTag(tag: string) {
  return applyDecorators(ApiTags(tag))
}

export function SwaggerBearerAuth() {
  return applyDecorators(ApiBearerAuth())
}

export function SwaggerPrivateRoute(tagName: string) {
  return applyDecorators(SwaggerTag(tagName), SwaggerBearerAuth(), SwaggerUnauthorized401())
}

export function SwaggerQueryParam(
  name: string,
  isRequired?: boolean,
  description?: string,
  enumValues?: number[] | string[]
) {
  return applyDecorators(ApiQuery({ name, required: isRequired ?? false, description, enum: enumValues }))
}

export const transformJoiSchemaToValidationMessages = (schema: Joi.ObjectSchema) => {
  const transformedSchema = {}

  Object.keys(schema.describe().keys).forEach((key) => {
    const keySchema = schema.describe().keys[key]

    const messages = []

    // Check if the key is required
    if (keySchema.flags && keySchema.flags.presence === 'required') {
      messages.push(VALIDATION_MESSAGES.required)
    }

    // Check the key type
    switch (keySchema.type) {
      case 'boolean':
        messages.push(VALIDATION_MESSAGES.invalidBoolean)
        break
      case 'number':
        messages.push(VALIDATION_MESSAGES.invalidNumber)
        break
      case 'string':
        messages.push(VALIDATION_MESSAGES.invalidString)
        break
      case 'array':
        messages.push(VALIDATION_MESSAGES.invalidArray)
        break
    }

    // Loop through the rules for the key
    keySchema.rules?.forEach((rule) => {
      if (rule.name === 'email') {
        messages.push(VALIDATION_MESSAGES.invalidEmail)
      }
      if (rule.name === 'min') {
        messages.push(keySchema.preferences.messages[`${keySchema.type}.min`])
      }
      if (rule.name === 'max') {
        messages.push(keySchema.preferences.messages[`${keySchema.type}.max`])
      }
    })

    transformedSchema[key] = messages
  })

  return transformedSchema
}

export const transformJoiSchemaToSwaggerSchema = (schema: Joi.ObjectSchema) => {
  const transformedSchema: {
    [key: string]: string[]
  } = transformJoiSchemaToValidationMessages(schema)

  return Object.entries(transformedSchema).reduce(
    (acc, [key, messages]) => ({
      ...acc,
      [key]: {
        type: 'array',
        items: { type: 'string' },
        example: messages
      }
    }),
    {}
  )
}
