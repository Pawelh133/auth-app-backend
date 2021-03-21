import { AssignableObject } from '../../../../utils/object-operations/assignable-object';

export class LoginResponse extends AssignableObject {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public accessTokenExpiresIn: number) {
    super();

    this.assignIfExists(accessToken, 'accessToken');
    this.assignIfExists(refreshToken, 'refreshToken');
    this.assignIfExists(accessTokenExpiresIn, 'accessTokenExpiresIn');
  }
}
