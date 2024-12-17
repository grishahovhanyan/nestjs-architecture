import { Transform } from 'class-transformer'
import { map, trim } from 'lodash'

/**
 * @description Trim spaces from start and end
 */
export function Trim(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return trim(value).replaceAll(/\s\s+/g, ' ')
    } else if (Array.isArray(value)) {
      return map(value, (v) => (typeof v === 'string' ? trim(v).replaceAll(/\s\s+/g, ' ') : v))
    }

    return value
  })
}

/**
 * @description Convert string boolean value to boolean
 */
export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true':
          return true
        case 'false':
          return false
        default:
          return params.value
      }
    },
    { toClassOnly: true }
  )
}

/**
 * @description Convert string to integer
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        return Number.parseInt(value, 10)
      }

      return value
    },
    { toClassOnly: true }
  )
}
