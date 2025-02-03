import { Get, Param, Query } from '@nestjs/common'

import { Swagger } from '@app/swagger'
import { EnhancedController, RequestUser, TransformResponse } from '@app/common'

import { GetUsersDto, UserResponseDto } from './dto'
import { UsersService } from './users.service'

@EnhancedController('users')
@TransformResponse(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Swagger({ response: UserResponseDto })
  @Get('me')
  getMe(@RequestUser('id') currentUserId: number) {
    return this.usersService.getById(currentUserId)
  }

  @Swagger({ response: UserResponseDto, pagination: true })
  @Get()
  index(@RequestUser('id') currentUserId: number, @Query() query: GetUsersDto) {
    return this.usersService.index(currentUserId, query)
  }

  @Swagger({ response: UserResponseDto })
  @Get(':id')
  find(@Param('id') userId: number) {
    return this.usersService.find(userId)
  }
}
