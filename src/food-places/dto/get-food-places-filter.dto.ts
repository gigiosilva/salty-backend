import { IsString, IsOptional } from 'class-validator';

export class GetFoodPlacesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
