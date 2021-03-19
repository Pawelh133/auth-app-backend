import { Injectable } from '@nestjs/common';

import { RegisterUserRequestDto } from 'src/auth/dto/request/register-user.request.dto';

@Injectable()
export class ProfileService {

  async get(registerUserRequestDto: RegisterUserRequestDto): Promise<void> {
    return await null;
  }

  async update(registerUserRequestDto: RegisterUserRequestDto): Promise<void> {
    return await null
  }
}
