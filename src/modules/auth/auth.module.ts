import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtConfigService } from './jwt-config.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
