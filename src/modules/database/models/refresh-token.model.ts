import { BeforeInsert, BeforeUpdate, Column, JoinColumn, ManyToOne } from 'typeorm';

import { DateTimeConverter } from '../../../utils/helpers/datetime-converter.helper';
import { User } from '../entities/user.entity';
import { DbBaseModel } from './db-base.model';

export class RefreshTokenModel extends DbBaseModel {
  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @ManyToOne(type => User, property => property.refreshTokens)
  @JoinColumn()
  user: User;

  @BeforeUpdate()
  setUpdatedOn(): void {
    this.updatedAt = DateTimeConverter.timestampNow();
  }

  @BeforeInsert()
  setCreatedOn(): void {
    this.createdAt = DateTimeConverter.timestampNow();
  }
}
