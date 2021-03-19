import { Entity } from 'typeorm';
import { RefreshTokenModel } from '../models/refresh-token.model';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends RefreshTokenModel {
  create(refreshToken: string): RefreshToken {
    this.refreshToken = refreshToken;

    return this;
  }
}
