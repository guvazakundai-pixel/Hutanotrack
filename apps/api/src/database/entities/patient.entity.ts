import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Gender, BloodType, RiskLevel } from '@hutanotrack/shared';
import { UserEntity } from './user.entity';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column({ type: 'jsonb', default: {} })
  address!: Record<string, unknown>;

  @Column({ type: 'jsonb', default: [] })
  emergencyContacts!: Record<string, unknown>[];

  @Column({ type: 'enum', enum: BloodType, nullable: true })
  bloodType?: BloodType;

  @Column({ type: 'simple-array', default: '' })
  allergies!: string[];

  @Column({ type: 'simple-array', default: '' })
  chronicConditions!: string[];

  @Column({ type: 'enum', enum: RiskLevel, default: RiskLevel.GREEN })
  riskLevel!: RiskLevel;

  @Column({ nullable: true })
  assignedCHWId?: string;

  @Column({ type: 'float', nullable: true })
  heightCm?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
