import { CreateRolDto } from './create-rol.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRolDto extends PartialType(CreateRolDto) {}
