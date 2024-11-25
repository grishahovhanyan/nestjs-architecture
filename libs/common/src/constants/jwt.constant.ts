import { envService } from '../utils'

export const JWT_SECRET = envService.getEnvString('JWT_SECRET', 'strong_secret_key')
export const JWT_EXPIRATION = envService.getEnvString('JWT_EXPIRATION', '1d')
