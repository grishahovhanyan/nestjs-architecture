import { EmailField } from '@app/common/validators'

export class ForgotPasswordDto {
  @EmailField()
  email: string
}
