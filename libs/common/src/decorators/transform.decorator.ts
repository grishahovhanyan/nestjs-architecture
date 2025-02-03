import { applyDecorators, UseInterceptors } from '@nestjs/common'

import { TransformInterceptor } from '@app/common'

export function TransformResponse(dtoClass: new () => any) {
  return applyDecorators(UseInterceptors(new TransformInterceptor(dtoClass)))
}
