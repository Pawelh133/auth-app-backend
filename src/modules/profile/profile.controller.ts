import { Controller, HttpCode, Get, HttpStatus, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileRequestDto } from './dto/request/profile-request.dto';
import { ProfileResponseDto } from './dto/response/profile-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUserRequestId } from 'src/utils/interface/userRequestId';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async get(@Req() request: IUserRequestId): Promise<ProfileResponseDto> {
    return await this.profileService.get(request.user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: ProfileRequestDto, @Req() request: IUserRequestId): Promise<ProfileResponseDto> {
    return await this.profileService.update(request.user.id, body);
  }
}
