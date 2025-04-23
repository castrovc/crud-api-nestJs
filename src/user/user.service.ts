import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  async create({ username, password, rolId }: CreateUserDto) {
    try {
      const rol = await this.roleRepository.findOne({
        where: { id: rolId, isActive: true }
      });
      if (!rol) {
        throw new Error('Rol not found');
      }
      const user = new User();
      user.username = username;
      user.password = password;
      user.role = rol;
      await this.userRepository.save(user);

      return {
        ok: true,
        message: 'User created successfully',
        status: 201
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 400 }
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['role'],
        where: { isActive: true }
      });

      if (users.length > 0) {
        return {
          ok: true,
          status: 200,
          users
        }
      }
      return {
        ok: false,
        status: 404,
        message: 'No users found'
      }

    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role']
      });
      if (user) {
        return {
          ok: true,
          status: 200,
          user
        }
      }
      return {
        ok: false,
        status: 404,
        message: 'User not found'
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 404 }
    }
  }

  async update(id: number, { password, username, rolId }: UpdateUserDto) {
    try {

      const rol = await this.roleRepository.findOne({
        where: { id: rolId, isActive: true }
      });
      if (!rol) {
        throw new Error('Rol not found');
      }

      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role']
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.username = username;
      user.password = password;
      user.role = rol;
      await this.userRepository.save(user);
      return {
        ok: true,
        message: 'User updated successfully',
        status: 200
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 400 }
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isActive: true },
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.isActive = false;
      await this.userRepository.save(user);
      return {
        ok: true,
        message: 'User deleted successfully',
        status: 200
      }
    } catch (error) {
      return { ok: false, message: error.message, status: 400 }
    }
  }
}
