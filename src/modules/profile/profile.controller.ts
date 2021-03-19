import { Controller, HttpCode, Get, HttpStatus, Body, Patch, Param } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileRequestDto } from './dto/request/profile-request.dto';
import { ProfileResponseDto } from './dto/response/profile-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  async get(@Param() id: string): Promise<ProfileResponseDto> {
    return await this.profileService.get(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param() id: string, @Body() body: ProfileRequestDto): Promise<ProfileResponseDto> {
    return await this.profileService.update(id, body);
  }
}
