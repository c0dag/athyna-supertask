import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 5;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;
}
