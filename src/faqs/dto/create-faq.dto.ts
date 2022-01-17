import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly category: string;
}
