import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
