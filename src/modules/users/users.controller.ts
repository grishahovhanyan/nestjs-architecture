import { Get, Query, Param } from '@nestjs/common'

import { Swagger } from '@app/swagger'
import { paginatedResponse, NotFoundException, EnhancedController, RequestUser, TransformResponse } from '@app/common'
import { GetUsersDto } from './dto/user.dto'
import { UserResponseDto } from './dto/user-response.dto'

import { UsersService } from './users.service'

@EnhancedController('users')
@TransformResponse(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Swagger({ response: UserResponseDto })
  @Get('me')
  async getMe(@RequestUser('id') currentUserId: number) {
    return await this.usersService.getById(currentUserId)
  }

  @Swagger({ response: UserResponseDto, pagination: true })
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetUsersDto) {
    const { items, totalCount } = await this.usersService.getAndCount({
      ...query,
      userIdsToExclude: [currentUserId]
    })

    return paginatedResponse(items, totalCount, query.page, query.perPage)
  }

  @Swagger({ response: UserResponseDto })
  @Get(':id')
  async find(@Param('id') userId: number) {
    const user = await this.usersService.getById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
