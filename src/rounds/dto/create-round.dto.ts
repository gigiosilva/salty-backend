import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoundDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly createdBy: string; // UserId

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly endDate: Date;

  @ApiProperty()
  readonly comments: string;

  @ApiProperty({
    default: false,
  })
  readonly isActive: boolean;
}
