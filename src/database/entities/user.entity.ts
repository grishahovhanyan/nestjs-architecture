import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

import { PasswordTransformer } from '../../common/transformers/password.transformer'
import { Product } from './product.entity'

@Entity(DB_TABLES.Users)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  email: string

  @Column({
    name: 'password',
    transformer: new PasswordTransformer(),
    nullable: false
  })
  password: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  registeredAt: Date

  @OneToMany(() => Product, (product) => product.creator)
  @JoinColumn([{ name: 'id', referencedColumnName: 'createdBy' }])
  products: Product[]

  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...self } = this
    return {
      ...self,
      fullName: `${this.firstName} ${this.lastName}`
    }
  }
}
