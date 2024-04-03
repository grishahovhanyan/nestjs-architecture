import { Module } from '@nestjs/common'
import { createClient } from 'redis'

import { REDIS_CONFIGS_KEY, REDIS_CLIENT_KEY } from '@database/constants'
import { authRedisConfigs } from '@database/config'
import { RedisService } from './redis.service'

@Module({
  providers: [
    {
      provide: REDIS_CONFIGS_KEY,
      useValue: authRedisConfigs
    },
    {
      inject: [REDIS_CONFIGS_KEY],
      provide: REDIS_CLIENT_KEY,
      useFactory: async (options: { url: string }) => {
        const client = createClient(options)
        await client.connect()
        return client
      }
    },
    RedisService
  ],
  exports: [REDIS_CLIENT_KEY, RedisService]
})
export class RedisModule {}
