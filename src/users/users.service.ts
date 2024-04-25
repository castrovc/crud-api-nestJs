import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Like, Repository } from 'typeorm';
import { CustomHttpException } from 'src/commons/middlewares/custom-http-exeptions';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create({ email, name, password, rolId }: CreateUserDto) {
    try {
      const rol = await this.roleRepository.findOne({
        where: { id: rolId, isActive: true },
      });
      if (!rol)
        throw new CustomHttpException('Role not found', HttpStatus.NOT_FOUND);

      const user = new User();
      (user.name = name), (user.email = email);
      user.password = password;
      user.role = rol;
      user.hashPassword();

      await this.userRepository.save(user);
      return {
        ok: true,
        user,
        status: HttpStatus.CREATED,
        message: 'User Created',
      };
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listPaginated({ page, limit, name, email }: SearchUserDto) {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        relations: { role: true },
        where: {
          name: Like(`%${name}%`),
          email: Like(`%${email}%`),
          isActive: true,
        },
        order: { id: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      if (users.length > 0) {
        let totalPag: number = total / limit;
        if (totalPag % 1 !== 0) {
          totalPag = Math.trunc(totalPag) + 1;
        }
        let nextPag: number = page >= totalPag ? page : Number(page) + 1;
        let prevPag: number = page <= 1 ? page : page - 1;
        return {
          ok: true,
          users,
          total,
          totalPag,
          currentPag: Number(page),
          nextPag,
          prevPag,
          status: HttpStatus.OK,
        };
      }

      throw new CustomHttpException(`Users not found`, HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        where: {
          isActive: true,
        },
      });

      if (users.length > 0) {
        return {
          ok: true,
          users,
          status: HttpStatus.OK,
          message: 'Users Found',
        };
      }

      throw new CustomHttpException('No Users Found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isActive: true },
      });

      if (!user) {
        throw new CustomHttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      return {
        ok: true,
        user,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, { name, email, rolId }: UpdateUserDto) {
    try {
      const rol = await this.roleRepository.findOne({
        where: { id: rolId, isActive: true },
      });
      if (!rol) {
        throw new CustomHttpException(`Role not found`, HttpStatus.NOT_FOUND);
      }

      const user = await this.userRepository.findOneBy({
        id,
      });

      if (!user) {
        throw new CustomHttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      user.name = name;
      user.email = email;
      user.role = rol;

      await this.userRepository.save(user);
      return {
        ok: true,
        user,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });

      if (!user) {
        throw new CustomHttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      user.isActive = false;
      await this.userRepository.save(user);
      return {
        ok: true,
        user,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new CustomHttpException(
        `Error => ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
