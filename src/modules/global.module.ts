import { Global, Module } from '@nestjs/common'
import { PostgresModule } from '@app/database'

/* 
####### NOTE #######
This `GlobalModule` centralizes and exports modules that should be globally available across the entire NestJS application.
For example, you can add other globally used modules like `RedisModule`, `AWSModule`, etc., to the `GLOBAL_MODULES` array.
This approach helps to avoid importing these modules repeatedly in individual feature modules.
*/
const GLOBAL_MODULES = [PostgresModule]

@Global()
@Module({
  imports: GLOBAL_MODULES,
  exports: GLOBAL_MODULES
})
export class GlobalModule {}
