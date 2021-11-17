import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
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
