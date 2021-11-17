import { IsString, IsNumber } from 'class-validator';

export class GetAccessDto {
  @IsString()
  access_token: string;

  @IsString()
  scope: string;

  @IsNumber()
  expires_in: number;

  @IsString()
  token_type: string;
}
