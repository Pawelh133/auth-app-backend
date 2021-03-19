import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import { TokenByLoginReqestDto } from './dto/request/token-by-login.request.dto';
import { TokenByRefreshRequestDto } from './dto/request/token-by-refresh.request.dto';
import { LoginResponse } from './dto/response/login.response.dto';
import { TokenResponse } from './dto/response/token.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async register(registerUserDto: RegisterUserRequestDto): Promise<void> {
    const user = await this.userRepository.create(registerUserDto);
    await this.userRepository.save(user);
  }

  async login(registerUserDto: TokenByLoginReqestDto): Promise<LoginResponse> {
    return null;
  }

  async token(registerUserDto: TokenByRefreshRequestDto): Promise<TokenResponse> {
    return null;
  }
}
