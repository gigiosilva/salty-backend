import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodPlacesService } from './food-places.service';
import { FoodPlacesController } from './food-places.controller';
import { FoodPlacesRepository } from './food-places.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FoodPlacesRepository])],
  providers: [FoodPlacesService],
  controllers: [FoodPlacesController],
})
export class FoodPlacesModule {}
