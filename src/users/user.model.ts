import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserModel {
  constructor(item) {
    this.IdUser = item.user_id;
    this.Name = item.name;
    this.NickName = item.nickname;
    this.Email = item.email;
    this.Picture = item.picture;
    this.CreatedAt = item.created_at;
    this.LastLogin = item.last_login;
  }

  @ApiProperty()
  @IsString()
  IdUser: string;

  @ApiProperty()
  @IsString()
  Name: string;

  @ApiProperty()
  @IsString()
  NickName: string;

  @ApiProperty()
  @IsString()
  Email: string;

  @ApiProperty()
  @IsString()
  Picture: string;

  @ApiProperty()
  @IsString()
  CreatedAt: string;

  @ApiProperty()
  @IsString()
  LastLogin: string;
}
