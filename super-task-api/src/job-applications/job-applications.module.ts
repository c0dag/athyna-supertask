import { Module } from '@nestjs/common';
import { ApplicationsService } from './job-applications.service';
import { ApplicationsController } from './job-applications.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
