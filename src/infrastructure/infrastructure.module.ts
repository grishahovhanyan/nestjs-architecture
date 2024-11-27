import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envValidationSchema, JwtAuthGuard, RequestLoggerInterceptor } from '@app/common'
import { PostgresModule, RedisModule } from '@app/database'
import { AWSModule } from './aws/aws.module'

/* 
####### NOTE #######
The `InfrastructureModule` centralizes foundational modules and services that are globally required across the NestJS application.
It includes essential services and integrations such as `RedisModule`, `AWSModule`, and others that provide critical functionalities like caching, external service interactions, and cloud integrations.

By making this module global, it eliminates the need to repeatedly import these modules in individual feature modules, 
ensuring that all necessary global dependencies (like configuration, guards, and interceptors) are available application-wide.

You can also add other shared or infrastructural services here, such as logging, database connections, authentication mechanisms, etc.

Any additional global services or modules can be added to this module as the application evolves.
*/

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envValidationSchema
    }),
    PostgresModule,
    RedisModule,
    AWSModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor
    }
  ],
  exports: [RedisModule, AWSModule]
})
export class InfrastructureModule {}
