import { ApiProperty } from '@nestjs/swagger';

export class CreateRoundUserDto {
  @ApiProperty()
  readonly friendId: string;

  @ApiProperty()
  readonly giftPhoto: string;

  @ApiProperty()
  readonly giftDescription: string;

  @ApiProperty()
  readonly giftDate: Date;

  @ApiProperty()
  readonly hasGift: boolean;
}
