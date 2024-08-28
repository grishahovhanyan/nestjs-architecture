import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { userProperties } from '@app/swagger'

export function SwaggerUsersGetMe() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: userProperties
      }
    })
  )
}
