import { IsNotEmpty } from 'class-validator';

export class TokenByRefreshRequestDto {
  // @ApiModelProperty({ description: 'refresh token to receive new access token' })
  @IsNotEmpty()
  readonly refreshToken: string;
}
