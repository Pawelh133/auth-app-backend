import { Column, OneToMany } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { DbBaseModelUid } from './db-base-uid.model';

export class UserModel extends DbBaseModelUid {
  @Column({ length: 50, nullable: true })
  name?: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 200, nullable: true })
  password?: string;

  @OneToMany(type => RefreshToken, refreshToken => refreshToken.user, { cascade: true })
  refreshTokens?: RefreshToken[];
}
