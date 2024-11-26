/* 
####### NOTE #######
This entity is not used anywhere in the project,
it is used only to demonstrate the types of entity relationships
In real projects, it is recommended to save each entity 
in the `src/modules/MODULE_NAME/entities` folder for better organization.
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DbTables } from '../db.enum'

@Entity(DbTables.baskets)
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
