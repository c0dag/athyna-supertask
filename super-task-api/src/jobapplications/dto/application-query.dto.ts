import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class ApplicationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
