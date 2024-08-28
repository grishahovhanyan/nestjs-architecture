import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerTag, SwaggerAuth } from '@app/swagger'

import { Public, BadRequestException, ERROR_MESSAGES } from '@app/common'
import { LoginDto, RegisterDto } from './dto/auth.dto'

import { AuthService } from './auth.service'
import { UsersService } from '@modules/users/users.service'

@SwaggerTag(SWAGGER_TAGS.Auth)
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @SwaggerAuth.register()
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.getByEmail(registerDto.email)

    if (user) {
      throw new BadRequestException(ERROR_MESSAGES.userAlreadyExists)
    }

    const createdUser = await this.usersService.create(registerDto)

    return createdUser
  }

  @SwaggerAuth.login()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password)

    return this.authService.login(user)
  }
}
