import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { TokenByRefreshRequestDto } from './dto/request/token-by-refresh.request.dto';
import { RefreshToken } from '../database/entities/refresh-token.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) { }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user',
        'refreshToken',
        'user.email',
        'user.id'])
      .where('email = :email', { email, })
      .leftJoin('user.refreshTokens', 'refreshToken')
      .getOne();
  }

  async getRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository
      .createQueryBuilder('refreshToken')
      .select([
        'refreshToken',
        'refreshToken.refreshToken',
        'user.id',
        'user.email'])
      .leftJoin('refreshToken.user', 'user')
      .where('refreshToken.refreshToken = :refreshToken', { refreshToken })
      .getOne();
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async updateRefreshToken(updatedTokenId: number, updatedToken: RefreshToken): Promise<void> {
    await this.refreshTokenRepository.update(updatedTokenId, updatedToken);
  }

  async saveRefreshToken(refreshToken: RefreshToken): Promise<void> {
    await this.refreshTokenRepository.save(refreshToken);
  }
}
