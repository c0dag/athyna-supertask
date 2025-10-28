import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { JobType } from '../../common/types/JobTypes';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsBoolean()
  @IsOptional()
  isRemote?: boolean;
}
