import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPreferenceDto {
  @ApiProperty({
    isArray: true,
    default: ['gluten free', 'vegan'],
  })
  readonly preferences: string[];

  @ApiProperty()
  readonly comments: string;

  @ApiProperty()
  readonly isDelivery: boolean;
}
