import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string
}
