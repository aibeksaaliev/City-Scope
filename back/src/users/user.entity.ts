import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Location } from '../locations/location.entity';
import { Feedback } from '../feedbacks/feedback.entity';

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

  @ApiHideProperty()
  @Column({ unique: true })
  token: string;

  @Column({ nullable: true })
  locale: string;

  @Column({ default: false })
  isBlocked: boolean;

  @CreateDateColumn()
  registeredAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Location, (location) => location.approvedBy)
  approvedLocations: Location[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @Exclude()
  @ManyToMany(() => Location, (location) => location.users, { cascade: true })
  @JoinTable()
  favoriteLocations: Location[];

  async generateToken() {
    this.token = crypto.randomUUID();
  }

  async checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
