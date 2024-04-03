import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { HashService } from '@utils/hash.service'
import { VALIDATION_MESSAGES } from '@utils/messages'
import { UsersService } from '@modules/users/users.service'

import { User } from '@entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email)
    if (!user || !HashService.compare(pass, user.password)) {
      throw new BadRequestException(VALIDATION_MESSAGES.invalidEmailPassword)
    }

    return user
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign({ userId: user.id })
    }
  }
}
