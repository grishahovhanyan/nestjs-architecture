import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '@utils/messages'
import { paginatedResponseProperties, productProperties } from './schema-properties'
import { transformJoiSchemaToSwaggerSchema } from './utils'

import { registerJoiSchema, loginJoiSchema } from '@joi-schemas/auth.schema'
import { createProductJoiSchema, updateProductJoiSchema } from '@joi-schemas/product.schema'

const BAD_REQUEST_DESCRIPTION = 'Bad Request'

const arrayProperty = (key: string, example: string[]) => ({
  [key]: {
    type: 'array',
    items: { type: 'string' },
    example
  }
})

export const SWAGGER_SCHEMAS = {
  // ******* Exceptions *******
  registerValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...transformJoiSchemaToSwaggerSchema(registerJoiSchema),
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.userAlreadyExists])
      }
    }
  },
  loginValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...transformJoiSchemaToSwaggerSchema(loginJoiSchema),
        ...arrayProperty('nonFieldErrors', [VALIDATION_MESSAGES.invalidEmailPassword])
      }
    }
  },
  createProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...transformJoiSchemaToSwaggerSchema(createProductJoiSchema)
      }
    }
  },
  updateProductValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...transformJoiSchemaToSwaggerSchema(updateProductJoiSchema)
      }
    }
  },
  // **************************
  loginResponse: {
    description: 'Success',
    schema: { properties: { accessToken: { type: 'string' } } }
  },
  paginatedResponse: (itemProperties) => ({
    schema: { properties: paginatedResponseProperties(itemProperties) }
  }),
  getProductResponse: { schema: { properties: productProperties } }
}
