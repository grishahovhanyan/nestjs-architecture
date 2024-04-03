import 'dotenv/config'
import { SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'

import { swaggerConfigs, swaggerOptions } from '@swagger/config'
import { AppModule } from '@modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('api/v1')

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfigs)
  SwaggerModule.setup('swagger-ui', app, swaggerDocument, swaggerOptions)

  const port = process.env.PORT || 4000
  await app.listen(port, () => console.info(`Server started on port: ${port}`))
}
bootstrap()
