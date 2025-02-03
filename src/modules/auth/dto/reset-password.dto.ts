import { VALIDATION_MESSAGES } from '@app/common'
import { PasswordField, StringField } from '@app/common/validators'

export class ResetPasswordDto {
  @StringField()
  readonly token: string

  @PasswordField()
  password: string

  @StringField({ example: 'password', matchKey: 'password', matchMessage: VALIDATION_MESSAGES.passwordMismatch })
  confirmPassword: string
}
