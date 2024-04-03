import { applyDecorators } from '@nestjs/common'

import { SwaggerForbidden403, SwaggerNotFound404, SwaggerSuccess200 } from '@swagger/responses'

export function SwaggerProductsDelete() {
  return applyDecorators(SwaggerSuccess200(), SwaggerForbidden403(), SwaggerNotFound404())
}
