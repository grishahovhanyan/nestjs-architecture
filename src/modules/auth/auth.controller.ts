import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerTag } from '@swagger/utils'
import { SwaggerAuth } from '@swagger/auth'

import { Public } from '@decorators/public.decorator'
import { AuthValidation } from '@validators/auth.validator'
import { BadRequest } from '@exceptions/index'
import { ERROR_MESSAGES } from '@utils/messages'
import { LoginUserDto, RegisterUserDto } from '@dto/user.dto'
import { AuthService } from './auth.service'
import { UsersService } from '@modules/users/users.service'
import { TransactionInterceptor } from '@interceptors/transaction.interceptor'

@SwaggerTag(SWAGGER_TAGS.Auth)
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @SwaggerAuth.register()
  @Post('register')
  @HttpCode(200)
  @AuthValidation.register()
  @UseInterceptors(TransactionInterceptor)
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.getByEmail(registerUserDto.email)

    if (user) {
      throw new BadRequest(ERROR_MESSAGES.userAlreadyExists)
    }

    const createdUser = await this.usersService.create(registerUserDto)

    return createdUser
  }

  @SwaggerAuth.login()
  @Post('login')
  @HttpCode(200)
  @AuthValidation.login()
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password)

    return this.authService.login(user)
  }
}
