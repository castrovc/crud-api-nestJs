import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create({ code, name, price, cost, stock }: CreateProductDto) {
    try {
      const products = new Product();
      products.code = code;
      products.name = name;
      products.price = price;
      products.cost = cost;
      products.stock = stock;
      await this.productRepository.save(products);
      return {
        ok: true,
        message: 'Product created successfully',
        status: 201
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 500 }
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find({
        where: { isActive: true }
      });
      if (products.length > 0) {
        return {
          ok: true,
          status: 200,
          products
        }
      }
      return {
        ok: false,
        status: 404,
        message: 'No products found'
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 500 }
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id, isActive: true } });
      if (product) {
        return {
          ok: true,
          status: 200,
          product
        }
      }
      return {
        ok: false,
        status: 404,
        message: 'Product not found'
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 500 }
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: { id, isActive: true }
      });
      if (!product) {
        throw new Error('Product not found');
      }
      product.name = updateProductDto.name;
      product.price = updateProductDto.price;
      product.cost = updateProductDto.cost;
      product.stock = updateProductDto.stock;
      await this.productRepository.save(product);
      return {
        ok: true,
        message: 'Product updated successfully',
        status: 200
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 500 }
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id, isActive: true }
      });
      if (!product) {
        throw new Error('Product not found');
      }
      product.isActive = false;
      await this.productRepository.save(product);
      return {
        ok: true,
        message: 'Product deleted successfully',
        status: 200
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 500 }
    }
  }
}
