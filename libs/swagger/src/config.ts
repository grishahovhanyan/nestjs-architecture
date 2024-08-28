import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const SWAGGER_CONFIGS = new DocumentBuilder()
  .setTitle('NestJS Architecture')
  .setDescription('NestJS Architecture')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
  .build()

export const SWAGGER_OPTIONS: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    requestInterceptor: (req) => {
      req.credentials = 'include'
      return req
    }
  },
  customSiteTitle: 'NestJS - Swagger'
}
