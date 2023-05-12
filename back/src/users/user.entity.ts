import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';

const SALT_WORK_FACTOR = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @ApiHideProperty()
  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Exclude()
  @ApiHideProperty()
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @Column({ nullable: true })
  locale: string;

  @Column({ nullable: true })
  isBlocked: string;

  @CreateDateColumn()
  registeredAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
