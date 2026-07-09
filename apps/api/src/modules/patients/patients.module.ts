import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientEntity } from '../../database/entities/patient.entity';
import { HealthReadingEntity } from '../../database/entities/health-reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, HealthReadingEntity])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
