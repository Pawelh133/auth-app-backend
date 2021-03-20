import { IsNotEmpty } from 'class-validator';

export class TokenByRefreshRequestDto {
  @IsNotEmpty()
  readonly refreshToken: string;
}
