import { Module } from '@nestjs/common'

import { AuthModule } from '@modules/auth/auth.module'
import { UsersModule } from '@modules/users/users.module'
import { InfrastructureModule } from '@infra/infrastructure.module'

import { AppController } from './app.controller'

@Module({
  imports: [InfrastructureModule, AuthModule, UsersModule],
  controllers: [AppController]
})
export class AppModule {}
