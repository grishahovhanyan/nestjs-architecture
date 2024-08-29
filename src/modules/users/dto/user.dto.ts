import { ApiPropertyOptional } from '@nestjs/swagger'
import { USERS_SORT_FIELDS, getOrderingDescription } from '@app/common'
import { IOrderObject } from '@app/database'

export class GetUsersDto {
  @ApiPropertyOptional()
  page?: number

  @ApiPropertyOptional()
  perPage?: number

  @ApiPropertyOptional({ description: getOrderingDescription(USERS_SORT_FIELDS) })
  ordering?: string

  @ApiPropertyOptional({ description: 'Text for searching' })
  searchText?: string

  @ApiPropertyOptional({ description: 'birthDate greater than equal (Must be in YYYY-DD-MM format)' })
  birthDateGte?: string

  @ApiPropertyOptional({ description: 'birthDate less than equal (Must be in YYYY-DD-MM format)' })
  birthDateLte?: string

  @ApiPropertyOptional({ description: 'ageGte greater than equal' })
  ageGte?: number

  @ApiPropertyOptional({ description: 'ageLte less than equal' })
  ageLte?: number

  order?: IOrderObject
  userIdsToExclude?: number[]
  userIdsToInclude?: number[]
}

export class CreateUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
}
