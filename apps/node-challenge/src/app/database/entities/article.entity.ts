import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { User } from './user.entitiy'

@Entity()
export class Article {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  slug: string

  @Column({ default: null })
  published_at: Date

  @Column({ default: false })
  isPrivate: boolean

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  @Column({ nullable: false })
  userId: string
}
