import { Injectable, NotFoundException } from '@nestjs/common';

import { ProfileRequestDto } from './dto/request/profile-request.dto';
import { ProfileResponseDto } from './dto/response/profile-response.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
  ) { }

  async get(id: string): Promise<ProfileResponseDto> {
    const result = await this.profileRepository.getOne(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return new ProfileResponseDto(result);
  }

  async update(id: string, registerUserRequestDto: ProfileRequestDto): Promise<ProfileResponseDto> {
    let userToUpdate = await this.profileRepository.getOne(id);

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    userToUpdate.update(registerUserRequestDto)

    const result = await this.profileRepository.save(userToUpdate);

    return new ProfileResponseDto(result);
  }
}
