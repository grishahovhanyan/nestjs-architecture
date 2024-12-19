import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'
import { VALIDATION_MESSAGES } from '@app/common'
import { EmailField, PasswordField, StringField } from '@app/common/validators'

export class RegisterDto {
  @StringField({ example: 'John' })
  firstName: string

  @StringField({ example: 'Doe' })
  lastName: string

  @EmailField()
  email: string

  @ApiProperty({ example: '2004-04-14' })
  @IsString({ message: VALIDATION_MESSAGES.invalidISOFormat })
  @IsDefined()
  birthDate: Date

  @PasswordField()
  password: string

  @StringField({ example: 'password', matchKey: 'password', matchMessage: VALIDATION_MESSAGES.passwordMismatch })
  confirmPassword: string
}

export class LoginDto {
  @EmailField()
  email: string

  @StringField({ example: 'password' })
  password: string
}
