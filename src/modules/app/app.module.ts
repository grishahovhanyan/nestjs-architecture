import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'

import { envValidationSchema, JwtAuthGuard, RequestLoggerInterceptor } from '@app/common'
import { AppController } from './app.controller'

import { GlobalModule } from '@modules/global.module'
import { AuthModule } from '@modules/auth/auth.module'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envValidationSchema
    }),
    GlobalModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor
    }
  ]
})
export class AppModule {}
