import { Get, Controller } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute } from '@swagger/utils'
import { SwaggerUsers } from '@swagger/users'

import { RequestUser } from '@decorators/user.decorator'
import { User } from '@entities/user.entity'

@SwaggerPrivateRoute(SWAGGER_TAGS.Users)
@Controller('users')
export class UsersController {
  @SwaggerUsers.getMe()
  @Get('me')
  async getMe(@RequestUser() currentUser: User) {
    return currentUser
  }
}
