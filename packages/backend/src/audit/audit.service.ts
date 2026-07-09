import { Injectable, Logger } from '@nestjs/common';

interface AuditEntry {
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger('Audit');
  private auditLog: AuditEntry[] = [];

  async log(entry: AuditEntry) {
    const logEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    this.auditLog.push(logEntry);
    this.logger.log(
      `[AUDIT] User: ${entry.userId} | Action: ${entry.action} | Resource: ${entry.resource}`,
    );

    // In production, persist to database
    // await this.auditRepository.save(logEntry);

    return logEntry;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const start = (page - 1) * limit;

    let filtered = [...this.auditLog];

    if (params.userId) filtered = filtered.filter((e) => e.userId === params.userId);
    if (params.action) filtered = filtered.filter((e) => e.action === params.action);
    if (params.resource) filtered = filtered.filter((e) => e.resource === params.resource);

    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  async getStats() {
    return {
      totalEntries: this.auditLog.length,
      byAction: this.auditLog.reduce(
        (acc, entry) => {
          acc[entry.action] = (acc[entry.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      uniqueUsers: new Set(this.auditLog.map((e) => e.userId)).size,
    };
  }
}
