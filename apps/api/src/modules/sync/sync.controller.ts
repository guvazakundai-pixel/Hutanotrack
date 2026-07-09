import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller({ path: 'sync', version: '1' })
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  async sync(@CurrentUser() user: any, @Body() payload: any) {
    return this.syncService.processSync(user.id, payload);
  }

  @Get(':lastSyncAt')
  async getChanges(@CurrentUser() user: any, @Param('lastSyncAt') lastSyncAt: string) {
    return this.syncService.getChangesSince(user.id, lastSyncAt);
  }
}
