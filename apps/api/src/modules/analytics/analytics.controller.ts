import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@hutanotrack/shared';

@Controller({ path: 'analytics', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('clinic/:clinicId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.DATA_MANAGER)
  async getClinicDashboard(@Param('clinicId') clinicId: string) {
    return this.analyticsService.getClinicDashboard(clinicId);
  }

  @Get('community')
  @Roles(UserRole.ADMIN, UserRole.DATA_MANAGER)
  async getCommunityStats(@Query('district') district: string) {
    return this.analyticsService.getCommunityStats(district);
  }
}
