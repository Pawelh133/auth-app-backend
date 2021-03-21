import { IsNotEmpty } from 'class-validator';

export class LogoutRequestDto {
  @IsNotEmpty()
  readonly refreshToken: string;
}
