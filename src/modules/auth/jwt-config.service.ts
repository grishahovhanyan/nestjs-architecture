import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { JWT_CONSTANTS } from '@utils/constants'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: JWT_CONSTANTS.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_CONSTANTS.JWT_EXPIRATION_TIME
      }
    }
  }
}
