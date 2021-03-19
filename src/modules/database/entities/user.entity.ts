import { Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from '../models/user.model';
import { RegisterUserRequestDto } from '../../auth/dto/request/register-user.request.dto';

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
}
