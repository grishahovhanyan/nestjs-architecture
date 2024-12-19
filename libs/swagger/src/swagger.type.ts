import { Type } from '@nestjs/common'

export interface SwaggerOptions<R = unknown> {
  response?: Type<R>
  pagination?: boolean
  isArray?: boolean
  operation?: string
  description?: string
  201?: boolean
  400?: boolean
  401?: boolean
  403?: boolean
  404?: boolean
}
