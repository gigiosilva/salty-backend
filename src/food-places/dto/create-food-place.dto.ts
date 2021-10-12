import { IsNotEmpty } from 'class-validator';

export class CreateFoodPlaceDto {
  @IsNotEmpty()
  readonly name: string;

  readonly website: string;
}
