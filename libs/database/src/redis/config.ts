import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

export const REDIS_CONFIG = {
  url: configService.get('REDIS_URL')
}
