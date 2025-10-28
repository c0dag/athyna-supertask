import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): object {
    return {
      status: 'ok',
      message: 'API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
