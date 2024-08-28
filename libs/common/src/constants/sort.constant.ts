import { IOrderObject } from '@app/database'

export enum SortDirections {
  ascending = 'ASC',
  descending = 'DESC'
}

export const USERS_SORT_FIELDS = ['id', 'registeredAt']

export function getSortOrderFromQuery(queryOrdering: string[], allowedSortFields: string[]): IOrderObject {
  const sortOrder = queryOrdering.reduce((orderObject, sortField) => {
    let sortDirection = SortDirections.ascending
    if (sortField.startsWith('-')) {
      sortDirection = SortDirections.descending
      sortField = sortField.slice(1)
    }

    if (allowedSortFields.includes(sortField)) {
      orderObject[sortField] = sortDirection
    }
    return orderObject
  }, {})

  return sortOrder
}
