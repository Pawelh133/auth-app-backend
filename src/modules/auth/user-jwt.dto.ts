import { User } from '../../modules/database/entities/user.entity';

export class UserJwt {
  readonly id: string;
  readonly email: string;
  readonly user: User;

  constructor(user: User, id: string, email: string) {
    this.id = id;
    this.email = email;
    this.user = user;
  }
}
