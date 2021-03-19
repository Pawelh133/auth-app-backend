import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { ProfileRequestDto } from './dto/request/profile-request.dto';
import { ProfileResponseDto } from './dto/response/profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async get(id: string): Promise<ProfileResponseDto> {
    const result = await this.userRepository.findOne(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return new ProfileResponseDto(result);
  }

  async update(id: string, registerUserRequestDto: ProfileRequestDto): Promise<ProfileResponseDto> {
    const user = await this.userRepository.preload({ id: id, ...registerUserRequestDto });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userRepository.save(user);

    return new ProfileResponseDto(result);
  }
}
