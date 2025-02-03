import { Transform } from 'class-transformer'

import { DEFAULT_PAGE_SIZE, getPerPage, PageTypes } from '../utils'
import { NumberFieldOptional } from '../validators'

export function PaginationDto(pageType?: PageTypes) {
  class DynamicPaginationDto {
    @NumberFieldOptional({ positive: true })
    page: number = 1

    @Transform(({ value }) => (pageType ? getPerPage(pageType, value) : DEFAULT_PAGE_SIZE), { toClassOnly: true })
    @NumberFieldOptional({ positive: true })
    perPage: number = DEFAULT_PAGE_SIZE
  }

  return DynamicPaginationDto
}
