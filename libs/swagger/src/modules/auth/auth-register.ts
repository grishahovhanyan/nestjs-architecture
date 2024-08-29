import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { UserResponseDto } from '@app/common'

export function SwaggerAuthRegister() {
  return applyDecorators(ApiOkResponse({ type: UserResponseDto }))
}
