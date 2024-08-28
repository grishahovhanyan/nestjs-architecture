import 'dotenv/config'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'

import { SWAGGER_CONFIGS, SWAGGER_OPTIONS } from '@app/swagger'
import { NodeEnvs, ValidationPipe, getEnvNumber, getNodeEnv } from '@app/common'
import { AppModule } from '@modules/app/app.module'

async function bootstrap() {
  initializeTransactionalContext()
  const nodeEnv = getNodeEnv()

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api/v1')

  if (nodeEnv !== NodeEnvs.test && nodeEnv !== NodeEnvs.production) {
    const swaggerDocument = SwaggerModule.createDocument(app, SWAGGER_CONFIGS)
    SwaggerModule.setup('swagger-ui', app, swaggerDocument, SWAGGER_OPTIONS)
  }

  const port = getEnvNumber('PORT', 4000)
  await app.listen(port, () => console.info(`Server started on port: ${port}`))
}
bootstrap()
