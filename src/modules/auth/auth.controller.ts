import { Body, HttpCode, Post } from '@nestjs/common'
import { SwaggerAuth } from '@app/swagger'

import {
  EnhancedController,
  TransformResponse,
  BadRequestException,
  ERROR_MESSAGES,
  UserResponseDto,
  LoginResponseDto
} from '@app/common'
import { LoginDto, RegisterDto } from './dto/auth.dto'

import { AuthService } from './auth.service'
import { UsersService } from '@modules/users/users.service'

@EnhancedController('', false, 'Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @SwaggerAuth.register()
  @Post('register')
  @HttpCode(200)
  @TransformResponse(UserResponseDto)
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
  @TransformResponse(LoginResponseDto)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password)

    return this.authService.login(user)
  }
}
