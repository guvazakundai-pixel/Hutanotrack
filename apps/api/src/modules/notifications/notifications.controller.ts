import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@hutanotrack/shared';

@Controller({ path: 'notifications', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('sms')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  async sendSMS(@Body() dto: { phoneNumber: string; message: string }) {
    return this.notificationsService.sendSMS(dto.phoneNumber, dto.message);
  }

  @Post('reminder/appointment')
  @Roles(UserRole.ADMIN, UserRole.RECEPTIONIST)
  async sendAppointmentReminder(@Body() dto: { patientPhone: string; appointmentDate: string; clinic: string }) {
    return this.notificationsService.sendAppointmentReminder(dto.patientPhone, dto.appointmentDate, dto.clinic);
  }
}
