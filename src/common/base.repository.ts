import { Request } from 'express'
import { DataSource, DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ENTITY_MANAGER_KEY } from '@interceptors/transaction.interceptor'
import { IFindAndCountInput, IFindAndCountOutput, IFindInput } from '@interfaces/db.interface'

export class BaseRepository<T> {
  constructor(private dataSource: DataSource, private request: Request, private entity: new () => T) {}

  protected getRepository(): Repository<T> {
    const entityManager: EntityManager = this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager
    return entityManager.getRepository(this.entity)
  }

  async findAndCount(input: IFindAndCountInput<T>): Promise<IFindAndCountOutput<T>> {
    const { conditions, relations = [], take, skip, order } = input

    const [items, totalCount] = await this.getRepository().findAndCount({
      where: conditions,
      relations,
      take,
      skip,
      order
    })

    return { items, totalCount }
  }

  async create(createInput: DeepPartial<T>): Promise<T> {
    const user = this.getRepository().create(createInput)
    await this.getRepository().save(user)

    return user
  }

  async findOne(conditions: FindOptionsWhere<T>, findInput?: IFindInput): Promise<T> {
    return await this.getRepository().findOne({
      where: conditions,
      relations: findInput?.relations || []
    })
  }

  async update(conditions: FindOptionsWhere<T>, updateInput: QueryDeepPartialEntity<T>) {
    return await this.getRepository().update(conditions, updateInput)
  }

  async delete(conditions: FindOptionsWhere<T>) {
    return await this.getRepository().delete(conditions)
  }
}
