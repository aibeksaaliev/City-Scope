import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamp with time zone' })
  expiresAt: Date;
}
