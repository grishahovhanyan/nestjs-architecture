import { IntersectionType } from '@nestjs/swagger'
import { PageTypes, PaginationDto, SearchDto, OrderDto, USERS_SORT_FIELDS } from '@app/common'
import { NumberFieldOptional, StringFieldOptional } from '@app/common/validators'

export class GetUsersDto extends IntersectionType(
  PaginationDto(PageTypes.messages),
  SearchDto,
  OrderDto(USERS_SORT_FIELDS)
) {
  @StringFieldOptional({ description: 'birthDate greater than equal (Must be in YYYY-DD-MM format)' })
  birthDateGte?: string

  @StringFieldOptional({ description: 'birthDate less than equal (Must be in YYYY-DD-MM format)' })
  birthDateLte?: string

  @NumberFieldOptional({ description: 'ageGte greater than equal' })
  ageGte?: number

  @NumberFieldOptional({ description: 'ageLte less than equal' })
  ageLte?: number

  userIdsToExclude?: number[]
  userIdsToInclude?: number[]
}
