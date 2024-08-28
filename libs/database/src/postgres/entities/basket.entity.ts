/* 
####### NOTE #######
This entity is not used anywhere in the project,
it is used only to demonstrate the types of entity relationships
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

@Entity(DB_TABLES.Baskets)
export class Basket {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  /*
  ####### NOTE #######
  OneToOne relationship between the current entity and the User entity
  */
  // @OneToOne(() => User, (user) => user.basket)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: User
}
