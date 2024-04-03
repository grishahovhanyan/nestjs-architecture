import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string

  @ApiProperty({ example: 'Doe' })
  lastName: string

  @ApiProperty({ example: 'example@gmail.com' })
  email: string

  @ApiProperty({ example: 'password' })
  password: string

  @ApiProperty({ example: 'password' })
  confirmPassword: string
}

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email: string

  @ApiProperty({ example: 'password' })
  password: string
}
