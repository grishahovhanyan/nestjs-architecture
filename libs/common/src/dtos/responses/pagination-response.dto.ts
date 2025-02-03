import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PagesDto {
  @ApiProperty({ example: 3 })
  next: number

  @ApiProperty({ example: 1 })
  previous: number

  @ApiProperty({ example: 2 })
  current: number

  @ApiProperty({ example: 5 })
  numPages: number

  @ApiProperty({ example: 30 })
  perPage: number
}

export class PaginationResponseDto<T = Record<string, unknown>> {
  @ApiProperty()
  @Type(() => PagesDto)
  pages: PagesDto

  @ApiProperty({ example: 30 })
  count: number

  @ApiProperty()
  items: T[]
}
