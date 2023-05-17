import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.locations, { onDelete: 'CASCADE' })
  user: User;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'json' })
  coordinates: { lat: string; lon: string };

  @Column({ nullable: true })
  logo: string;

  @Column()
  description: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column()
  workingHours: string;

  @Column()
  contacts: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  approvedAt: Date;

  @Column({ nullable: true })
  approvedBy: number;

  @Column({ default: false })
  isApproved: boolean;
}
