import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@hutanotrack/shared';

@Controller({ path: 'patients', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.COMMUNITY_HEALTH_WORKER)
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('riskLevel') riskLevel?: string,
    @Query('search') search?: string,
  ) {
    return this.patientsService.findAll({ page, limit, riskLevel, search });
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async getStats() {
    return this.patientsService.getStats();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.COMMUNITY_HEALTH_WORKER)
  async findOne(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  async create(@Body() data: any) {
    return this.patientsService.create(data);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async update(@Param('id') id: string, @Body() data: any) {
    return this.patientsService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.patientsService.update(id, { isActive: false } as any);
  }

  @Get(':id/readings')
  async getReadings(@Param('id') id: string, @Query('type') type?: string, @Query('limit') limit?: number) {
    if (type) return this.patientsService.getReadingsByType(id, type, limit);
    return this.patientsService.getLatestReadings(id, limit);
  }

  @Post(':id/readings')
  async recordReading(@Param('id') id: string, @Body() data: any) {
    return this.patientsService.recordReading({ ...data, patientId: id });
  }
}
