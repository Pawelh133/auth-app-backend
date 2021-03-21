import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';

import { User } from '../database/entities/user.entity';
import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import { TokenByLoginReqestDto } from './dto/request/token-by-login.request.dto';
import { TokenByRefreshRequestDto } from './dto/request/token-by-refresh.request.dto';
import { LoginResponse } from './dto/response/login.response.dto';
import { TokenResponse } from './dto/response/token.response.dto';
import { IJwtPayload } from './jwt-payload.interface';
import { DateTimeConverter } from '../../utils/helpers/datetime-converter.helper';
import { RefreshToken } from '../database/entities/refresh-token.entity';
import { AuthRepository } from './auth.repository';
import { ConfigData } from './auth.config';
import { LogoutRequestDto } from './dto/request/logout.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterUserRequestDto): Promise<void> {
    const user = await this.authRepository.getUserByEmail(registerUserDto.email);

    if (user) {
      throw new BadRequestException('Użytkownik z takim adresem email juz istnieje.');
    }

    const newUser = await (new User().create(registerUserDto));

    await this.authRepository.saveUser(newUser);
  }

  async login(tokenByLoginReqestDto: TokenByLoginReqestDto): Promise<LoginResponse> {
    const user = await this.authRepository.getUserByEmail(tokenByLoginReqestDto.email);

    if (!user) {
      throw new BadRequestException('Błędny adres email, lub niepoprawne hasło.');
    }

    const passwordCorrect = await this.compareHashToPassword(tokenByLoginReqestDto.password, user.password);

    if (!passwordCorrect) {
      throw new BadRequestException('Błędny adres email, lub niepoprawne hasło.');
    }

    const refreshToken = this.generateRefreshToken();
    const accessTokenExpiresIn = ConfigData.accesTokenExpiresIn;
    const accessToken = this.generateAccessToken(user);

    if (!isEmpty(user.refreshTokens)) {
      await this.updateCurrentRefreshToken(user, refreshToken);
    } else {
      const refreshTokenModel = new RefreshToken().create(refreshToken);
      await this.assignNewRefreshToken(user, refreshTokenModel);
    }

    return new LoginResponse(
      accessToken,
      refreshToken,
      accessTokenExpiresIn);
  }

  async logout(logoutRequestDto: LogoutRequestDto): Promise<void> {
    await this.authRepository.deleteRefreshToken(logoutRequestDto.refreshToken);
  }

  private async updateCurrentRefreshToken(user: User, refreshToken: string): Promise<void> {
    const updatedToken = user.refreshTokens[0];
    updatedToken.refreshToken = refreshToken;
    updatedToken.updatedAt = DateTimeConverter.timestampNow();

    await this.authRepository.updateRefreshToken(updatedToken.id, updatedToken);
  }

  private async assignNewRefreshToken(user: User, refreshToken: RefreshToken): Promise<void> {
    refreshToken.user = user;


    await this.authRepository.saveRefreshToken(refreshToken);
  }

  async token(registerUserDto: TokenByRefreshRequestDto): Promise<TokenResponse> {
    const refreshTokenModel = await this.authRepository.getRefreshToken(registerUserDto.refreshToken);

    if (!refreshTokenModel || !this.isTokenActual(refreshTokenModel.createdAt)) {
      throw new BadRequestException('Token jest nieaktualny lub nie istnieje.');
    }

    const accessToken = this.generateAccessToken(refreshTokenModel.user);
    const newRefreshToken = this.generateRefreshToken();

    refreshTokenModel.create(newRefreshToken);

    await this.authRepository.saveRefreshToken(refreshTokenModel);

    return new TokenResponse({
      accessToken,
      accessTokenExpiresIn: ConfigData.accesTokenExpiresIn,
      refreshToken: newRefreshToken,
    });
  }

  async validateUser(payload: IJwtPayload): Promise<User> {
    return await this.authRepository.getUserById(payload.id);
  }

  private generateAccessToken(user: any): string {
    const userData: IJwtPayload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(userData);
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(25).toString('hex');
  }

  private async compareHashToPassword(userPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, hashedPassword);
  }

  private isTokenActual(tokenCreatedOn: number): boolean {
    const tokenExpiration = tokenCreatedOn + ConfigData.refreshTokenExpiresIn;;

    return tokenExpiration > DateTimeConverter.timestampNow();
  }
}
