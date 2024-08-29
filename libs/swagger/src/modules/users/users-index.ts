import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { UserResponseDto, getPaginationResponseDto } from '@app/common'

export function SwaggerUsersIndex() {
  return applyDecorators(ApiOkResponse({ type: getPaginationResponseDto(UserResponseDto) }))
}
