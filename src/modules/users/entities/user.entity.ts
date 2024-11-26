import { Exclude, Expose } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

import { DbTables } from '@app/database'
import { PasswordTransformer, calculateAge } from '@app/common'

@Entity(DbTables.users)
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
