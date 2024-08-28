import { getEnvString } from '../utils'

export const JWT_SECRET = getEnvString('JWT_SECRET', 'strong_secret_key')
export const JWT_EXPIRATION = getEnvString('JWT_EXPIRATION', '1d')
