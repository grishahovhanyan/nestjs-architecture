import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@app/database'
import { User } from './entities/user.entity'

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User)
  }
}
