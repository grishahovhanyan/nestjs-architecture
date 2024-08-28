import { NodeEnvs } from '@app/common/enums'

export function getEnvString(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue
}

export function getEnvNumber(key: string, defaultValue = 1) {
  return process.env[key] !== '' && !isNaN(+process.env[key]) ? +process.env[key] : defaultValue
}

export function getEnvFloat(key: string, defaultValue = 1.0) {
  return parseFloat(process.env[key]) || defaultValue
}

export function getEnvBoolean(key: string, defaultValue = true) {
  const value = process.env[key]
  return value !== 'true' && value !== 'false' ? defaultValue : value === 'true'
}

export function getNodeEnv() {
  return Object.keys(NodeEnvs).includes(getEnvString('NODE_ENV')) ? getEnvString('NODE_ENV') : NodeEnvs.development
}
