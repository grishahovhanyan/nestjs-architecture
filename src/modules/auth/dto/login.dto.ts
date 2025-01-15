import { EmailField, StringField } from '@app/common/validators'

export class LoginDto {
  @EmailField()
  email: string

  @StringField({ example: 'password' })
  password: string
}
