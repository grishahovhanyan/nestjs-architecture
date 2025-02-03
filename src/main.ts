import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { initializeTransactionalContext } from 'typeorm-transactional'

import { appUtilsService, envService } from '@app/common'
import { AppModule } from '@modules/app/app.module'

const logger = new Logger('App')

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Setup application
  appUtilsService.setupApp(app)

  // Start application
  const { apiPort, apiUrl } = envService.getApiUrl()
  await app.listen(apiPort, () => logger.log(`🚀 Application is running on: ${apiUrl}`))
}

bootstrap()

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception detected')

  throw err
})
