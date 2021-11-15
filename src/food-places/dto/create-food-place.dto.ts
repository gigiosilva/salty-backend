import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFoodPlaceDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  readonly website: string;

  @ApiProperty()
  readonly logo: string;

  @ApiProperty()
  readonly country: string;

  @ApiProperty()
  readonly isCustom: string;
}
