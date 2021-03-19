import { IsOptional, IsString } from "class-validator";

export class ProfileRequestDto {
  @IsOptional()
  @IsString()
  readonly email: string;
  
  @IsOptional()
  @IsString()
  readonly name?: string;
}
