import { Injectable } from '@nestjs/common';

import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import { TokenByLoginReqestDto } from './dto/request/token-by-login.request.dto';
import { TokenByRefreshRequestDto } from './dto/request/token-by-refresh.request.dto';
import { LoginResponse } from './dto/response/login.response.dto';
import { TokenResponse } from './dto/response/token.response.dto';

@Injectable()
export class AuthService {

  async register(registerUserDto: RegisterUserRequestDto): Promise<void> {
    return null;
  }

  async login(registerUserDto: TokenByLoginReqestDto): Promise<LoginResponse> {
    return null;
  }

  async token(registerUserDto: TokenByRefreshRequestDto): Promise<TokenResponse> {
    return null;
  }
}
