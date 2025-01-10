import { Body, HttpCode, Post } from '@nestjs/common'
import { Swagger } from '@app/swagger'

import { EnhancedController, TransformResponse, BadRequestException, ERROR_MESSAGES } from '@app/common'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { LoginResponseDto } from './dto/auth-response.dto'
import { UserResponseDto } from '@modules/users/dto/user-response.dto'

import { NotificationQueueService } from '@infra/queues'
import { AuthService } from './auth.service'
import { UsersService } from '@modules/users/users.service'

@EnhancedController('', false, 'Auth')
export class AuthController {
  constructor(
    private readonly notificationQueueService: NotificationQueueService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Swagger({ response: UserResponseDto, 400: true })
  @Post('register')
  @HttpCode(200)
  @TransformResponse(UserResponseDto)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.getByEmail(registerDto.email)

    if (user) {
      throw new BadRequestException(ERROR_MESSAGES.userAlreadyExists)
    }

    const createdUser = await this.usersService.create(registerDto)

    await this.notificationQueueService.registrationSuccess({
      fullName: createdUser.fullName,
      email: createdUser.email
    })

    return createdUser
  }

  @Swagger({ response: LoginResponseDto, errorResponses: [400] })
  @Post('login')
  @HttpCode(200)
  @TransformResponse(LoginResponseDto)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password)

    return this.authService.login(user)
  }
}
