import { Global, Module } from '@nestjs/common'

import { PostgresModule } from '@modules/database/postgres.module'
import { RedisModule } from '@modules/database/redis.module'
import { AWSModule } from '@modules/aws/aws.module'

const GLOBAL_MODULES = [PostgresModule, RedisModule, AWSModule]

@Global()
@Module({
  imports: GLOBAL_MODULES,
  exports: GLOBAL_MODULES
})
export class GlobalModule {}
