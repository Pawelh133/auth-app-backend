import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from '../database/entities/user.entity';
import { ProfileRepository } from './profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController]
})
export class ProfileModule { }
