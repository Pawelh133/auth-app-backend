import { Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from '../models/user.model';
import { RegisterUserRequestDto } from '../../auth/dto/request/register-user.request.dto';
import { ProfileRequestDto } from 'src/modules/profile/dto/request/profile-request.dto';

@Entity({ name: 'users' })
export class User extends UserModel {
  async create(registerUserDto: RegisterUserRequestDto): Promise<User> {
    this.email = registerUserDto.email;
    this.password = await this.encryptPassword(registerUserDto.password);

    return this;
  }

  private async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async update(profileRequestDto: ProfileRequestDto): Promise<User> {
    if (profileRequestDto.email) {
      this.email = profileRequestDto.email;
    }
    if(profileRequestDto.name) {
      this.name = profileRequestDto.name;
    }

    return this;
  }
}
