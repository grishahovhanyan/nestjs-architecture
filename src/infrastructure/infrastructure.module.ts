import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envValidationSchema, JwtAuthGuard, RequestLoggerInterceptor } from '@app/common'
import { PostgresModule, RedisModule } from '@app/database'
import { AWSModule } from './aws/aws.module'
import { QueueModule } from './queues/queue.module'

/* 
####### NOTE #######
The `InfrastructureModule` centralizes foundational modules and services that are globally required across the NestJS application.
It includes essential services and integrations such as `RedisModule`, `AWSModule`, and others that provide critical functionalities like caching, external service interactions, and cloud integrations.

By making this module global, it eliminates the need to repeatedly import these modules in individual feature modules, 
ensuring that all necessary global dependencies (like configuration, guards, and interceptors) are available application-wide.

You can also add other shared or infrastructural services here, such as logging, database connections, authentication mechanisms, etc.

Any additional global services or modules can be added to this module as the application evolves.
*/

/* 
####### NOTE #######
The `sharedFeatureModules` array includes all modules that:
1. Contain providers (e.g., services) which are required by other modules in the application (e.g., `SnsService` from `AWSModule`).
2. Must be included in both `imports` and `exports` of the `InfrastructureModule` to make their providers globally accessible.
*/

const sharedFeatureModules = [RedisModule, AWSModule, QueueModule]

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envValidationSchema
    }),
    PostgresModule,
    ...sharedFeatureModules
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
  exports: [...sharedFeatureModules]
})
export class InfrastructureModule {}
