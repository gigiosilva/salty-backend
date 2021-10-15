import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetFoodPlacesFilterDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
