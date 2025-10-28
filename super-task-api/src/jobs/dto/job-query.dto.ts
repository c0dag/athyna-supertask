import { IsOptional, IsString, IsEnum } from 'class-validator';
import { JobType } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class JobQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;
}
