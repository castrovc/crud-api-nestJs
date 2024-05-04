import { Injectable } from '@nestjs/common';
import { CreateGraphicDto } from './dto/create-graphic.dto';
import { UpdateGraphicDto } from './dto/update-graphic.dto';
import {
  dataExpensesByStore,
  dataProductsMostSold,
  dataSalesByMonth,
  dataSellers,
} from './dto/data';

@Injectable()
export class GraphicsService {
  create(createGraphicDto: CreateGraphicDto) {
    return 'This action adds a new graphic';
  }

  findAll() {
    return `This action returns all graphics`;
  }

  getSalesBySeller() {
    try {
      const data = dataSellers;
      return {
        ok: true,
        data,
        status: 200,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error',
        status: 500,
      };
    }
  }

  getExpensesByStore() {
    try {
      const data = dataExpensesByStore;
      return {
        ok: true,
        data,
        status: 200,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error',
        status: 500,
      };
    }
  }

  getSalesByMonth() {
    try {
      const data = dataSalesByMonth;
      return {
        ok: true,
        data,
        status: 200,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error',
        status: 500,
      };
    }
  }

  getProducstMostSold() {
    try {
      const data = dataProductsMostSold;
      return {
        ok: true,
        data,
        status: 200,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error',
        status: 500,
      };
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} graphic`;
  }

  update(id: number, updateGraphicDto: UpdateGraphicDto) {
    return `This action updates a #${id} graphic`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphic`;
  }
}
