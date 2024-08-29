import { Get, Controller, Query, Param } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerUsers } from '@app/swagger'

import {
  PAGE_SIZE_TYPES,
  getPaginationAndSortOrder,
  paginatedResponse,
  NotFoundException,
  RequestUser,
  TransformResponse,
  USERS_SORT_FIELDS,
  UserResponseDto
} from '@app/common'
import { UsersService } from './users.service'
import { GetUsersDto } from './dto/user.dto'

@SwaggerPrivateRoute(SWAGGER_TAGS.Users)
@Controller('users')
@TransformResponse(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SwaggerUsers.getMe()
  @Get('me')
  async getMe(@RequestUser('id') currentUserId: number) {
    return await this.usersService.getById(currentUserId)
  }

  @SwaggerUsers.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetUsersDto) {
    const { page, perPage, order } = getPaginationAndSortOrder(query, PAGE_SIZE_TYPES.users, USERS_SORT_FIELDS)

    const getAndCountInput: GetUsersDto = {
      ...query,
      page,
      perPage,
      order,
      userIdsToExclude: [currentUserId]
    }
    const { items, totalCount } = await this.usersService.getAndCount(getAndCountInput)

    return paginatedResponse(items, totalCount, page, perPage)
  }

  @SwaggerUsers.find()
  @Get(':id')
  async find(@Param('id') userId: number) {
    const user = await this.usersService.getById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
