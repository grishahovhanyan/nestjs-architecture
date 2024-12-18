import { SwaggerModule } from '@nestjs/swagger'
import { INestApplication, Logger } from '@nestjs/common'

import { envService } from './get-env'
import { SWAGGER_CONFIGS, SWAGGER_OPTIONS } from '@app/swagger'

class AppUtilsService {
  private readonly logger: Logger = new Logger('App')

  async gracefulShutdown(app: INestApplication, code: string): Promise<void> {
    setTimeout(() => process.exit(1), 5000)
    this.logger.verbose(`Signal received with code '${code}'`)

    try {
      await app.close()

      this.logger.log('✅ Http server closed.')
      process.exit(0)
    } catch (error: unknown) {
      this.logger.error(`❌ Http server closed with error: ${error}`)
      process.exit(1)
    }
  }

  killAppWithGrace(app: INestApplication): void {
    process.on('SIGINT', async () => {
      await this.gracefulShutdown(app, 'SIGINT')
    })

    process.on('SIGTERM', async () => {
      await this.gracefulShutdown(app, 'SIGTERM')
    })
  }

  public setupSwagger(app: INestApplication) {
    if (!envService.isTestEnv() && !envService.isProductionEnv()) {
      const apiHost = envService.getEnvString('API_HOST')
      const apiPort = envService.getEnvNumber('API_PORT', 5000)
      const apiUrl = `${apiHost}:${apiPort}`

      const swaggerPath = 'swagger-ui'
      const swaggerDocument = SwaggerModule.createDocument(app, SWAGGER_CONFIGS)
      SwaggerModule.setup(swaggerPath, app, swaggerDocument, SWAGGER_OPTIONS)

      this.logger.log(`📑 Swagger is running on: ${apiUrl}/${swaggerPath}`)
    }
  }
}

export const appUtilsService = new AppUtilsService()
