import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

import { User } from './user.entity'

@Entity(DB_TABLES.Products)
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  createdBy: number

  @Column()
  name: string

  @Column()
  category: string

  @Column()
  price: number

  @Column()
  description: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdBy' })
  creator: User
}
