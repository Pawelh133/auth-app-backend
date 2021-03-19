import { Column, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';

import { DateTimeConverter } from '../../../utils/helpers/datetime-converter.helper';
import { AssignableObject } from '../../../utils/object-operations/assignable-object';

export abstract class DbBaseModelUid extends AssignableObject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
