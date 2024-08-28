import { Inject, Injectable } from '@nestjs/common'
import { Redis, RedisKey } from 'ioredis'

import { REDIS_CLIENT_KEY } from './constants'

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT_KEY) private readonly redis: Redis) {}

  async get(key: RedisKey) {
    return await this.redis.get(key)
  }

  async set(key: RedisKey, value: string | number | Buffer) {
    return await this.redis.set(key, value)
  }
}
