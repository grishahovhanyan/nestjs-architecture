import { StringFieldOptional } from '../validators'

export class SearchDto {
  @StringFieldOptional({ description: 'Text for searching' })
  searchText?: string
}
