import { IsString, IsNumber } from 'class-validator';

export class AccessModel {
  @IsString()
  access_token: string;

  @IsString()
  scope: string;

  @IsNumber()
  expires_in: number;

  @IsString()
  token_type: string;
}
