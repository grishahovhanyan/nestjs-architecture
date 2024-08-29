import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { UserResponseDto } from '@app/common'

export function SwaggerUsersFind() {
  return applyDecorators(ApiOkResponse({ type: UserResponseDto }))
}
