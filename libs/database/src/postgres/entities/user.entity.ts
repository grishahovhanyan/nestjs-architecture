import { Exclude, Expose } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

import { PasswordTransformer } from '../../../../common/src/transformers/password.transformer'
import { calculateAge } from '../../../../common/src/utils/calculate'

@Entity(DB_TABLES.Users)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  birthDate: string

  @Exclude()
  @Column({
    transformer: new PasswordTransformer(),
    nullable: false
  })
  password: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  registeredAt: Date

  /*
  ####### NOTE #######
  OneToMany relationship between the current entity and the Product entity
  */
  // @OneToMany(() => Product, (product) => product.creator)
  // products: Product[]

  /*
  ####### NOTE #######
  OneToOne relationship between the current entity and the Basket entity
  */
  // @OneToOne(() => Basket, (basket) => basket.user)
  // basket: Basket

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Expose()
  get age(): number {
    return calculateAge(this.birthDate)
  }
}
