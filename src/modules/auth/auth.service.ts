import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '@app/database'
import { HashService, ERROR_MESSAGES } from '@app/common'
import { UsersService } from '@modules/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.getByEmail(email)
    if (!user || !HashService.compare(pass, user.password)) {
      throw new BadRequestException(ERROR_MESSAGES.invalidEmailPassword)
    }

    return user
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign({ userId: user.id })
    }
  }
}
