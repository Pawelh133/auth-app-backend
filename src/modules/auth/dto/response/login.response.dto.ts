import { AssignableObject } from '../../../../utils/object-operations/assignable-object';

class UserResult {
  id: string;
  accountType: string;
}

export class LoginResponse extends AssignableObject {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public accessTokenExpiresIn: number,
    userId: string) {
    super();

    this.assignIfExists(accessToken, 'accessToken');
    this.assignIfExists(refreshToken, 'refreshToken');
    this.assignIfExists(accessTokenExpiresIn, 'accessTokenExpiresIn');

    this.userResult = new UserResult();
    this.userResult.id = userId;
  }

  userResult: UserResult;
}
