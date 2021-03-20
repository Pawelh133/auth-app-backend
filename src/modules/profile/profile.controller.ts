import { Controller, HttpCode, Get, HttpStatus, Body, Patch, Param, UseGuards } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileRequestDto } from './dto/request/profile-request.dto';
import { ProfileResponseDto } from './dto/response/profile-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async get(@Param() id: string): Promise<ProfileResponseDto> {
    return await this.profileService.get(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param() id: string, @Body() body: ProfileRequestDto): Promise<ProfileResponseDto> {
    return await this.profileService.update(id, body);
  }
}
