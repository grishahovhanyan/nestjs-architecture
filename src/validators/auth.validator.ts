import { UsePipes, applyDecorators } from '@nestjs/common'
import { JoiValidationPipe } from '@pipes/joi-validation.pipe'
import { registerJoiSchema, loginJoiSchema } from '@joi-schemas/auth.schema'

export const AuthValidation = {
  register: () => applyDecorators(UsePipes(new JoiValidationPipe(registerJoiSchema))),
  login: () => applyDecorators(UsePipes(new JoiValidationPipe(loginJoiSchema)))
}
