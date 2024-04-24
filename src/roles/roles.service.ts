import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    try {
      const rol = this.rolRepository.create(createRolDto);
      await this.rolRepository.save(rol);
      return {
        ok: true,
        message: 'Rol creado correctamente',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Error al crear el rol',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll() {
    try {
      const roles = await this.rolRepository.find({
        where: { isActive: true },
      });

      if (roles.length > 0) {
        return {
          ok: true,
          roles,
          status: HttpStatus.OK,
        };
      }

      return {
        ok: false,
        message: 'No se encontraron roles',
        status: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'No se encontraron roles',
        status: HttpStatus.NOT_FOUND,
      };
    }
  }

  async findOne(id: number) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });

      if (!rol) {
        return {
          ok: false,
          message: 'Rol no encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        ok: true,
        rol,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Error al obtener el rol',
        status: HttpStatus.NOT_FOUND,
      };
    }
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });

      rol.name = updateRolDto.name;
      await this.rolRepository.save(rol);

      return {
        ok: true,
        message: 'Rol actualizado correctamente',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Error al actualizar el rol',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });

      rol.isActive = false;

      await this.rolRepository.save(rol);
      return {
        ok: true,
        message: 'Rol eliminado',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al eliminar el rol',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
