import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { User, BaseRepository } from '@app/database'

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User)
  }
}
