import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dto/pagination-common.dto';

export class SearchUserDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  name?: string = '';

  @IsOptional()
  @IsString()
  email?: string = '';

  @IsOptional()
  @IsString()
  phone?: string = '';

  @IsOptional()
  @IsString()
  role?: string = '';
}
