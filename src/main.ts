import 'dotenv/config'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'
import compression from 'compression'

import { ValidationPipe, appUtilsService, envService } from '@app/common'
import { AppModule } from '@modules/app/app.module'

const logger = new Logger('App')

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Register a global validation pipe to validate incoming requests
  app.useGlobalPipes(new ValidationPipe())

  // Set a global prefix for all routes in the API
  app.setGlobalPrefix('api/v1')

  // Enable CORS
  const origins = envService.getOrigins()
  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    maxAge: 3600
  })

  // Use Helmet to set secure HTTP headers to help protect against well-known vulnerabilities
  app.use(helmet())
  // Trust proxy headers for accurate client IP address detection when behind a reverse proxy
  app.enable('trust proxy')
  // Set strong ETag generation for caching and optimizing responses
  app.set('etag', 'strong')
  // Enable compression to reduce the size of the response bodies and improve loading times
  app.use(compression())

  // Configure application gracefully shutdown
  app.enableShutdownHooks()
  appUtilsService.killAppWithGrace(app)

  // Setup Swagger
  appUtilsService.setupSwagger(app)

  // Get host and port from environment variables and construct the base API URL
  const apiHost = envService.getEnvString('API_HOST')
  const apiPort = envService.getEnvNumber('API_PORT', 5000)
  const apiUrl = `${apiHost}:${apiPort}`

  // Start application
  await app.listen(apiPort, () => logger.log(`🚀 Application is running on: ${apiUrl}`))
  logger.log(`🚦 Accepting request only from: ${origins}`)
}

bootstrap()

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception detected')

  throw err
})
