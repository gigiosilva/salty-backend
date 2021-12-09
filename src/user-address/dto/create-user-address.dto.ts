import { ApiProperty } from '@nestjs/swagger';

import { WeekAvailability } from '../week-availability.enum';

export class CreateUserAddressDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly street: string;

  @ApiProperty()
  readonly district: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly country: string;

  @ApiProperty()
  readonly zipCode: string;

  @ApiProperty()
  readonly complement: string;

  @ApiProperty()
  readonly longAddress: string;

  @ApiProperty({
    enum: WeekAvailability,
    isArray: true,
    default: ['MONDAY', 'TUESDAY'],
  })
  readonly weekAvailability: WeekAvailability[];

  @ApiProperty()
  readonly latitude: string;

  @ApiProperty()
  readonly longitude: string;

  @ApiProperty({
    type: 'string',
    default: '00000000-0000-0000-0000-000000000000',
  })
  readonly foodPlaceId: string;
}
