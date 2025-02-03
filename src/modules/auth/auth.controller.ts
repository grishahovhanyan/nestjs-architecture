import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { Swagger } from '@app/swagger'
import { EnhancedController, TransformResponse } from '@app/common'
import { UserResponseDto } from '@modules/users/dto'

import { AuthService } from './auth.service'
import { ForgotPasswordDto, LoginDto, LoginResponseDto, RegisterDto, ResetPasswordDto } from './dto'

@EnhancedController('', false, 'Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Swagger({ response: UserResponseDto, 400: true })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @TransformResponse(UserResponseDto)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Swagger({ response: LoginResponseDto, 400: true })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @TransformResponse(LoginResponseDto)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('forgot-password')
  @Swagger({ errorResponses: [400, 404] })
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('reset-password')
  @Swagger({ errorResponses: [400, 404] })
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }
}
