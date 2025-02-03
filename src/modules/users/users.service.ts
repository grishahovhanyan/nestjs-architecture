import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { paginatedResponse } from '@app/common'

import { CreateUserDto, GetUsersDto } from './dto'
import { User } from './entities/user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(User)
    private readonly repo: Repository<User> // Can be used to create queryBuilder
  ) {}

  // ******* Controller Handlers *******
  async index(currentUserId: number, query: GetUsersDto) {
    const { items, totalCount } = await this.getAndCount({
      ...query,
      userIdsToExclude: [currentUserId]
    })

    return paginatedResponse(items, totalCount, query.page, query.perPage)
  }

  async find(userId: number) {
    const user = await this.getById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  // ******* ******* ******* *******

  async create(createUserInput: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createUserInput)
  }

  async getAndCount(getUsersInput: GetUsersDto) {
    const {
      page,
      perPage,
      order,
      searchText,
      birthDateGte,
      birthDateLte,
      ageGte,
      ageLte,
      userIdsToExclude,
      userIdsToInclude
    } = getUsersInput

    const queryBuilder = this.repo.createQueryBuilder('user')

    if (searchText?.trim()) {
      const formattedSearchText = `%${searchText.trim()}%`
      queryBuilder.andWhere("CONCAT(user.firstName, ' ', user.lastName) ILIKE :searchText", {
        searchText: formattedSearchText
      })
    }

    if (userIdsToExclude?.length) {
      queryBuilder.andWhere('user.id NOT IN (:...userIdsToExclude)', { userIdsToExclude })
    }

    if (userIdsToInclude?.length) {
      queryBuilder.andWhere('user.id IN (:...userIdsToInclude)', { userIdsToInclude })
    }

    if (birthDateGte) {
      queryBuilder.andWhere('user.birthDate >= :birthDateGte', { birthDateGte: new Date(birthDateGte) })
    }

    if (birthDateLte) {
      queryBuilder.andWhere('user.birthDate <= :birthDateLte', { birthDateLte: new Date(birthDateLte) })
    }

    if (ageGte) {
      const currentDate = new Date()
      const birthDateLteForAgeGte = new Date(currentDate.setFullYear(currentDate.getFullYear() - ageGte))
      queryBuilder.andWhere('user.birthDate <= :birthDateLteForAgeGte', { birthDateLteForAgeGte })
    }

    if (ageLte) {
      const currentDate = new Date()
      const birthDateGteForAgeLte = new Date(currentDate.setFullYear(currentDate.getFullYear() - ageLte - 1))
      queryBuilder.andWhere('user.birthDate >= :birthDateGteForAgeLte', { birthDateGteForAgeLte })
    }

    queryBuilder.take(perPage).skip((page - 1) * perPage)

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`user.${key}`, value as 'ASC' | 'DESC')
      })
    }

    const [items, totalCount] = await queryBuilder.getManyAndCount()

    return { items, totalCount }
  }

  async getById(userId: number): Promise<User | null> {
    return await this.usersRepository.findOne({ id: userId })
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ email })
  }

  async getByToken(token: string): Promise<User | null> {
    return await this.usersRepository.findOne({ token })
  }

  async updateById(userid: number, updateUserDto: Partial<User>): Promise<User | null> {
    await this.usersRepository.update({ id: userid }, updateUserDto)
    return await this.getById(userid)
  }
}
