import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  //Relations
  @ManyToOne(() => Role)
  role: Role;

  @RelationId((user: User) => user.role)
  roleId: number;

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
