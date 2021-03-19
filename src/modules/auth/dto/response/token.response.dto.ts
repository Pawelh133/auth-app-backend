import { AssignableObject } from '../../../../utils/object-operations/assignable-object';

export class TokenResponse extends AssignableObject {
  constructor(data: Partial<TokenResponse>) {
    super();

    this.assignIfExists(data.accessToken, 'accessToken');
    this.assignIfExists(data.refreshToken, 'refreshToken');
    this.assignIfExists(data.accessTokenExpiresIn, 'accessTokenExpiresIn');
  }

  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
}
