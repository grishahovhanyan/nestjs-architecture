import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { InfrastructureModule } from '@infra/infrastructure.module'
import { AuthModule } from '@modules/auth/auth.module'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [InfrastructureModule, AuthModule, UsersModule],
  controllers: [AppController]
})
export class AppModule {}
