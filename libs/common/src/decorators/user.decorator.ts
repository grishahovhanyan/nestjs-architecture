import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@app/database'

export const RequestUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user: User = request.user

  return data ? user?.[data] : user
})
