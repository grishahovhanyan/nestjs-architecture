import { IDbTables } from './db.interface'

export const DB_TABLES: IDbTables = {
  Users: 'users',
  Products: 'products',
  Baskets: 'baskets'
}

/* 
####### NOTE #######
This object is used to centralize all database relationship keys.
For example, instead of using strings like 'user', 'products', or 'basket' directly in the code, 
you should use DB_RELATIONS.user, DB_RELATIONS.products, and DB_RELATIONS.basket respectively.
This ensures consistency and avoids hardcoding strings throughout the project.
*/
export const DB_RELATIONS = {
  user: 'user'
}
