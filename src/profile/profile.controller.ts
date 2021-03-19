import { Controller, HttpCode, Get, HttpStatus, Body, Patch } from '@nestjs/common';

import { RegisterUserRequestDto } from 'src/auth/dto/request/register-user.request.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ title: 'register new user in application' })
  // @ApiOkResponse({ description: 'Created - new account has been created' })
  // @ApiBadRequestResponse({ description: 'Bad request - user with this email address already exists' })
  async get(@Body() body: RegisterUserRequestDto): Promise<void> {
    return await this.profileService.get(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ title: 'register new user in application' })
  // @ApiOkResponse({ description: 'Created - new account has been created' })
  // @ApiBadRequestResponse({ description: 'Bad request - user with this email address already exists' })
  async update(@Body() body: RegisterUserRequestDto): Promise<void> {
    return await this.profileService.update(body);
  }
}
