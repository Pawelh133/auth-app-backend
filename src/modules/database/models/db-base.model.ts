import { DateTimeConverter } from '../../../utils/helpers/datetime-converter.helper';
import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AssignableObject } from '../../../utils/object-operations/assignable-object';

export abstract class DbBaseModel extends AssignableObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  createdAt?: number;

  @Column({ nullable: true })
  updatedAt?: number;

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = DateTimeConverter.timestampNow();
  }

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = DateTimeConverter.timestampNow();
  }
}
