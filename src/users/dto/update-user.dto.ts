import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsObject()
  metadata: any;
}
