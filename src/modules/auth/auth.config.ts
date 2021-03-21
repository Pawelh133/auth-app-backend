export class ConfigData {
  static readonly accesTokenExpiresIn: number = 5 * 6000; //5m
  static readonly refreshTokenExpiresIn: number = 60 * 60 * 24 * 7; //7d
  static readonly accessTokenSecret?: string = 'secret';
}
