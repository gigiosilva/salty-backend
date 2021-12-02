import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class UserModel {
  constructor(user) {
    this.idUser = user.user_id;
    this.name = user.name;
    this.nickName = user.nickname;
    this.email = user.email;
    this.picture = user.picture;
    this.createdAt = user.created_at;
    this.lastLogin = user.last_login;
    this.metadata = user?.user_metadata ?? {};
  }

  @ApiProperty()
  @IsString()
  idUser: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  nickName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  lastLogin: string;

  @ApiProperty()
  @IsObject()
  metadata: any;
}
