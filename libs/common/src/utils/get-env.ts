import { NodeEnvs } from '@app/common/enums'

class EnvService {
  public getEnvString(key: string, defaultValue = ''): string {
    return process.env[key] || defaultValue
  }

  public getEnvNumber(key: string, defaultValue = 1) {
    return process.env[key] !== '' && !isNaN(+process.env[key]) ? +process.env[key] : defaultValue
  }

  public getEnvFloat(key: string, defaultValue = 1.0) {
    return parseFloat(process.env[key]) || defaultValue
  }

  public getEnvBoolean(key: string, defaultValue = true) {
    const value = process.env[key]
    return value !== 'true' && value !== 'false' ? defaultValue : value === 'true'
  }

  public getNodeEnv() {
    const processNodeEnv = this.getEnvString('NODE_ENV')
    return Object.keys(NodeEnvs).includes(processNodeEnv) ? processNodeEnv : NodeEnvs.development
  }

  public isTestEnv() {
    return this.getNodeEnv() === NodeEnvs.test
  }

  public isDevelopmentEnv() {
    return this.getNodeEnv() === NodeEnvs.development
  }

  public isProductionEnv() {
    return this.getNodeEnv() === NodeEnvs.production
  }

  public getOrigins(): string[] | string {
    const originArray = this.getEnvString('CORS_ORIGINS')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    return originArray.length ? originArray : '*'
  }
}

export const envService = new EnvService()
