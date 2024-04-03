import { createProductJoiSchema, updateProductJoiSchema } from '@joi-schemas/product.schema'
import { UsePipes, applyDecorators } from '@nestjs/common'
import { JoiValidationPipe } from '@pipes/joi-validation.pipe'

export const ProductsValidation = {
  create: () => applyDecorators(UsePipes(new JoiValidationPipe(createProductJoiSchema))),
  update: () => applyDecorators(UsePipes(new JoiValidationPipe(updateProductJoiSchema)))
}
