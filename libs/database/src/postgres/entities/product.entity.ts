/* 
####### NOTE #######
This entity is not used anywhere in the project,
it is used only to demonstrate the types of entity relationships
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

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

  /*
  ####### NOTE #######
  ManyToOne relationship between the current entity and the User entity
  */
  // @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'createdBy' })
  // creator: User
}
