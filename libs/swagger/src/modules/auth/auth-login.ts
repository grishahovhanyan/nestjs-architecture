import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { LoginResponseDto } from '@app/common'

export function SwaggerAuthLogin() {
  return applyDecorators(ApiOkResponse({ type: LoginResponseDto }))
}
