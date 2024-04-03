import { SwaggerProductsIndex } from './products-index'
import { SwaggerProductsCreate } from './products-create'
import { SwaggerProductsFind } from './products-find'
import { SwaggerProductsUpdate } from './products-update'
import { SwaggerProductsDelete } from './products-delete'

export const SwaggerProducts = {
  index: SwaggerProductsIndex,
  create: SwaggerProductsCreate,
  find: SwaggerProductsFind,
  update: SwaggerProductsUpdate,
  delete: SwaggerProductsDelete
}
