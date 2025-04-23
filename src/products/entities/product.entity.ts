import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  cost: number;

  @Column({ type: "decimal", precision: 10, scale: 0, default: 0 })
  stock: number;

  @Column()
  code: string;

  @Column({ default: true })
  isActive: boolean;
}
