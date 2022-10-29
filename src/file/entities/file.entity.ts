import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64 })
  title: string;

  @Column({ type: "varchar", length: 1024 })
  filename: string;
}