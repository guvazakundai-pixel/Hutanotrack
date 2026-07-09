import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '../../database/entities/patient.entity';
import { HealthReadingEntity } from '../../database/entities/health-reading.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(HealthReadingEntity)
    private readonly readingRepository: Repository<HealthReadingEntity>,
  ) {}

  async getClinicDashboard(clinicId: string) {
    const totalPatients = await this.patientRepository.count({ where: { clinicId: clinicId as any } });

    const riskDistribution = await this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.riskLevel', 'level')
      .addSelect('COUNT(*)', 'count')
      .where('patient.organizationId = :clinicId', { clinicId })
      .groupBy('patient.riskLevel')
      .getRawMany();

    const recentReadings = await this.readingRepository
      .createQueryBuilder('reading')
      .select("DATE(reading.recordedAt)", 'date')
      .addSelect("reading.type", 'type')
      .addSelect('AVG(reading.value)', 'avg')
      .where('reading.recordedAt >= NOW() - INTERVAL \'30 days\'')
      .groupBy('DATE(reading.recordedAt)')
      .addGroupBy('reading.type')
      .orderBy('date', 'ASC')
      .getRawMany();

    return { totalPatients, riskDistribution, trends: recentReadings };
  }

  async getCommunityStats(district: string) {
    const totalPatients = await this.patientRepository.count();
    const chwCount = await this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.assignedCHWId', 'chwId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patient.assignedCHWId')
      .getRawMany();

    return { district, totalPatients, activeCHWs: chwCount.length, patientPerCHW: chwCount };
  }
}
