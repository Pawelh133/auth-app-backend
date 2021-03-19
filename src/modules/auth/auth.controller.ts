import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import { TokenByLoginReqestDto } from './dto/request/token-by-login.request.dto';
import { TokenByRefreshRequestDto } from './dto/request/token-by-refresh.request.dto';
import { LoginResponse } from './dto/response/login.response.dto';
import { TokenResponse } from './dto/response/token.response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserRequestDto): Promise<void> {
    return await this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: TokenByLoginReqestDto): Promise<LoginResponse> {
    return await this.authService.login(body);
  }

  @Post('token')
  async token(@Body() body: TokenByRefreshRequestDto): Promise<TokenResponse> {
    return await this.authService.token(body);
  }
}
