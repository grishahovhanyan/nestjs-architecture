import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

import { JWT_EXPIRATION, JWT_SECRET } from '@app/common'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION }
    }
  }
}
