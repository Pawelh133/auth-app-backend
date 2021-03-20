import { IsEmail, IsNotEmpty } from 'class-validator';

export class TokenByLoginReqestDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
