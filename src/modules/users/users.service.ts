import { Injectable } from '@nestjs/common'

import { ICreateUserInput } from '@interfaces/user.interface'
import { DB_RELATIONS } from '@database/constants'
import { UsersRepository } from './users.repository'

import { User } from '@entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: ICreateUserInput): Promise<User> {
    return await this.usersRepository.create(createUserInput)
  }

  async getById(userId: number): Promise<User | null> {
    return await this.usersRepository.findOne({ id: userId }, { relations: [DB_RELATIONS.products] })
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ email }, { relations: [DB_RELATIONS.products] })
  }
}
