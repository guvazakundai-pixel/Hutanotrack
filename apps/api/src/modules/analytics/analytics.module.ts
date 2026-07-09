import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PatientEntity } from '../../database/entities/patient.entity';
import { HealthReadingEntity } from '../../database/entities/health-reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, HealthReadingEntity])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
