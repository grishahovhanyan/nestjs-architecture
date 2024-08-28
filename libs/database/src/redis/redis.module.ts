import { Module } from '@nestjs/common'
import { createClient } from 'redis'

import { REDIS_CONFIGS_KEY, REDIS_CLIENT_KEY } from './constants'
import { REDIS_CONFIG } from './config'
import { RedisService } from './redis.service'

@Module({
  providers: [
    {
      provide: REDIS_CONFIGS_KEY,
      useValue: REDIS_CONFIG
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
