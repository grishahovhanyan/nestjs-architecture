import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto, getSortOrderFromQuery } from '@app/common'
import { IOrderObject } from '@app/database'
import { getEnvNumber } from './get-env'

export const PAGE_SIZE_TYPES = {
  users: 'users'
}

export const PAGE_SIZES = {
  usersPageSize: getEnvNumber('USERS_PAGE_SIZE', 50)
}

export const MAX_PAGE_SIZES = {
  usersMaxPageSize: getEnvNumber('USERS_MAX_PAGE_SIZE', 200)
}

export function getPerPage(type: string, querySize?: number) {
  const maxSize = MAX_PAGE_SIZES[`${type}MaxPageSize`]
  const defaultSize = PAGE_SIZES[`${type}PageSize`]

  return Number(querySize) && Number(querySize) <= maxSize ? Number(querySize) : defaultSize
}

export function getPagesForResponse(totalCount: number, page: number, perPage: number) {
  const numPages = Math.ceil(totalCount / perPage)

  return {
    next: page + 1 > numPages ? null : page + 1,
    previous: page - 1 < 1 ? null : page - 1,
    current: page,
    numPages,
    perPage
  }
}

export function getPaginationAndSortOrder(
  query: { page?: number; perPage?: number; ordering?: string },
  pageSizeType: string,
  allowedSortFields: string[] = []
): { page: number; perPage: number; order: IOrderObject } {
  const page = +query.page || 1
  const perPage = getPerPage(pageSizeType, +query.perPage)
  const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], allowedSortFields)

  return { page, perPage, order }
}

export function paginatedResponse(items, totalCount: number, page: number, perPage: number) {
  return {
    pages: getPagesForResponse(totalCount, page, perPage),
    count: items.length,
    items
  }
}

export function getPaginationResponseDto<T>(dtoType: new () => T) {
  class PaginationResponseDtoWithItems<T> extends PaginationResponseDto {
    @ApiProperty({ isArray: true, type: () => dtoType })
    @Type(() => dtoType)
    items: T[]
  }

  return PaginationResponseDtoWithItems
}
