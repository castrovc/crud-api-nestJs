import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GraphicsService } from './graphics.service';
import { CreateGraphicDto } from './dto/create-graphic.dto';
import { UpdateGraphicDto } from './dto/update-graphic.dto';

@Controller('graphics')
export class GraphicsController {
  constructor(private readonly graphicsService: GraphicsService) {}

  @Post()
  create(@Body() createGraphicDto: CreateGraphicDto) {
    return this.graphicsService.create(createGraphicDto);
  }

  @Get()
  findAll() {
    return this.graphicsService.findAll();
  }

  @Get('sales-by-seller')
  getSalesBySeller() {
    return this.graphicsService.getSalesBySeller();
  }

  @Get('expenses-by-store')
  getExpensesByStore() {
    return this.graphicsService.getExpensesByStore();
  }

  @Get('products-most-sold')
  getProducstMostSold() {
    return this.graphicsService.getProducstMostSold();
  }

  @Get('sales-by-month')
  getSalesByMonth() {
    return this.graphicsService.getSalesByMonth();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGraphicDto: UpdateGraphicDto) {
    return this.graphicsService.update(+id, updateGraphicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graphicsService.remove(+id);
  }
}
