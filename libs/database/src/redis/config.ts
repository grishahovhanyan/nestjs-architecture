import { envService } from '@app/common'

const username = envService.getEnvString('REDIS_USERNAME', 'default')
const password = envService.getEnvString('REDIS_PASSWORD', 'user')
const host = envService.getEnvString('REDIS_HOST', 'localhost')
const port = envService.getEnvNumber('REDIS_PORT', 6379)

export const REDIS_CONFIG = {
  url: `redis://${username}:${password}@${host}:${port}`
}
