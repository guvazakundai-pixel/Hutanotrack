import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '../../database/entities/patient.entity';
import { HealthReadingEntity } from '../../database/entities/health-reading.entity';
import { classifyBP, classifyGlucose, calculateBMI } from '@hutanotrack/shared';
import { RiskLevel } from '@hutanotrack/shared';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(HealthReadingEntity)
    private readonly readingRepository: Repository<HealthReadingEntity>,
  ) {}

  async findAll(options?: { page?: number; limit?: number; riskLevel?: string; search?: string }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;

    const query = this.patientRepository.createQueryBuilder('patient')
      .leftJoinAndSelect('patient.user', 'user')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('patient.createdAt', 'DESC');

    if (options?.riskLevel) {
      query.andWhere('patient.riskLevel = :riskLevel', { riskLevel: options.riskLevel });
    }
    if (options?.search) {
      query.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.phoneNumber ILIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async create(data: Partial<PatientEntity>): Promise<PatientEntity> {
    const patient = this.patientRepository.create(data);
    return this.patientRepository.save(patient);
  }

  async update(id: string, data: Partial<PatientEntity>): Promise<PatientEntity> {
    await this.patientRepository.update(id, data);
    return this.findById(id);
  }

  async getLatestReadings(patientId: string, limit = 10) {
    return this.readingRepository.find({
      where: { patientId },
      order: { recordedAt: 'DESC' },
      take: limit,
    });
  }

  async getReadingsByType(patientId: string, type: string, limit = 30) {
    return this.readingRepository.find({
      where: { patientId, type: type as any },
      order: { recordedAt: 'DESC' },
      take: limit,
    });
  }

  async recordReading(data: Partial<HealthReadingEntity>): Promise<HealthReadingEntity> {
    const reading = this.readingRepository.create(data);
    const saved = await this.readingRepository.save(reading);

    // Auto-classify risk level
    await this.updateRiskLevel(data.patientId!);
    return saved;
  }

  private async updateRiskLevel(patientId: string) {
    const latestBP = await this.readingRepository.findOne({
      where: { patientId, type: 'blood_pressure' as any },
      order: { recordedAt: 'DESC' },
    });

    const latestGlucose = await this.readingRepository.findOne({
      where: { patientId, type: 'blood_glucose' as any },
      order: { recordedAt: 'DESC' },
    });

    let highestRisk = RiskLevel.GREEN;

    if (latestBP?.systolic && latestBP?.diastolic) {
      const bpRisk = classifyBP(latestBP.systolic, latestBP.diastolic);
      if (bpRisk.level === RiskLevel.RED) highestRisk = RiskLevel.RED;
      else if (bpRisk.level === RiskLevel.AMBER && highestRisk !== RiskLevel.RED) highestRisk = RiskLevel.AMBER;
    }

    if (latestGlucose) {
      const glucoseRisk = classifyGlucose(latestGlucose.value, false);
      if (glucoseRisk.level === RiskLevel.RED) highestRisk = RiskLevel.RED;
      else if (glucoseRisk.level === RiskLevel.AMBER && highestRisk !== RiskLevel.RED) highestRisk = RiskLevel.AMBER;
    }

    await this.patientRepository.update(patientId, { riskLevel: highestRisk });
  }

  async getStats() {
    const total = await this.patientRepository.count();
    const byRisk = await this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.riskLevel', 'riskLevel')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patient.riskLevel')
      .getRawMany();

    return { total, byRisk };
  }
}
