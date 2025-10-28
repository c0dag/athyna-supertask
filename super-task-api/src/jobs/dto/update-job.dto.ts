import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { JobStatus } from '../../common/types/JobStatus';
import { IsEnum } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsEnum(JobStatus)
  status?: JobStatus;
}
