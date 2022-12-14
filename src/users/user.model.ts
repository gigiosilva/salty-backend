import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UserModel {
  constructor(user) {
    this.idUser = user.user_id;
    this.name = user.name;
    this.nickName = user.nickname;
    this.email = user.email;
    this.picture = user.picture;
    this.createdAt = user.created_at;
    this.lastLogin = user.last_login;
    this.isRegistrationComplete = user?.user_metadata?.isRegistrationComplete ?? false;
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
  @IsBoolean()
  isRegistrationComplete: boolean;
}
