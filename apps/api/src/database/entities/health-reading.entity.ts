import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { ReadingType, ReadingSource } from '@hutanotrack/shared';
import { PatientEntity } from './patient.entity';

@Entity('health_readings')
export class HealthReadingEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  patientId!: string;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patientId' })
  patient!: PatientEntity;

  @Column({ type: 'enum', enum: ReadingType })
  type!: ReadingType;

  @Column({ type: 'float' })
  value!: number;

  @Column()
  unit!: string;

  @Column({ type: 'float', nullable: true })
  systolic?: number;

  @Column({ type: 'float', nullable: true })
  diastolic?: number;

  @Column({ type: 'enum', enum: ReadingSource, default: ReadingSource.MANUAL })
  source!: ReadingSource;

  @Column({ type: 'timestamptz' })
  recordedAt!: Date;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
