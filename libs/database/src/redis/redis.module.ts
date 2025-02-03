import { Logger, Module } from '@nestjs/common'
import { createClient, RedisClientOptions } from 'redis'

import { REDIS_CONFIG } from './config'
import { REDIS_CLIENT_KEY, REDIS_CONFIGS_KEY } from './constants'
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
      useFactory: async (options: RedisClientOptions) => {
        const logger = new Logger('Redis')

        if (!options) {
          throw new Error('❌ [Redis connection failed]: Invalid options passed')
        }

        try {
          const client = createClient(options)
          await client.connect()

          logger.log('⚡ Redis connection initialized successfully.')

          return client
        } catch (error) {
          logger.error(`❌ [Redis connection error]: ${error.message}`)
          throw error
        }
      }
    },
    RedisService
  ],
  exports: [REDIS_CLIENT_KEY, RedisService]
})
export class RedisModule {}
