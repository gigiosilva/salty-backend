import { IsString } from 'class-validator';

export class GetUsersDto {
  @IsString()
  user_id: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  picture: string;

  @IsString()
  created_at: string;

  @IsString()
  last_login: string;
}
