import { PartialType } from '@nestjs/mapped-types';
import { CreateGraphicDto } from './create-graphic.dto';

export class UpdateGraphicDto extends PartialType(CreateGraphicDto) {}
