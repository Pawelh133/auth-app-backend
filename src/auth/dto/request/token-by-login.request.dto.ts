import { IsEmail, IsNotEmpty } from 'class-validator';

export class TokenByLoginReqestDto {
  //   @ApiModelProperty({ description: 'user email' })
  @IsEmail()
  readonly email: string;

  //   @ApiModelProperty({ description: 'user password' })
  @IsNotEmpty()
  readonly password: string;
}
