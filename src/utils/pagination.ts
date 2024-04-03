export const PAGE_SIZE_TYPES = {
  products: 'products'
}

export const PAGE_SIZES = {
  productsPageSize: Number(process.env.PRODUCTS_PAGE_SIZE) || 50
}

export const MAX_PAGE_SIZES = {
  productsMaxPageSize: Number(process.env.PRODUCTS_MAX_PAGE_SIZE) || 200
}

export function getPageSize(type: string, querySize?: number) {
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

export function paginatedResponse(totalCount: number, page: number, perPage: number, results) {
  return {
    pages: getPagesForResponse(totalCount, page, perPage),
    count: results.length,
    results
  }
}
