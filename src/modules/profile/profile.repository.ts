import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
