import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFoodPlaceDto } from './dto/create-food-place.dto';
import { GetFoodPlacesFilterDto } from './dto/get-food-places-filter.dto';
import { FoodPlace } from './food-place.entity';
import { FoodPlacesRepository } from './food-places.repository';

@Injectable()
export class FoodPlacesService {
  constructor(
    @InjectRepository(FoodPlacesRepository)
    private foodPlacesRepository: FoodPlacesRepository,
  ) {}

  getFoodPlaces(filterDto: GetFoodPlacesFilterDto): Promise<FoodPlace[]> {
    return this.foodPlacesRepository.getFoodPlaces(filterDto);
  }

  createFoodPlace(createFoodPlaceDto: CreateFoodPlaceDto): Promise<FoodPlace> {
    return this.foodPlacesRepository.createFoodPlace(createFoodPlaceDto);
  }

  async getFoodPlaceById(id: string): Promise<FoodPlace> {
    const found = await this.foodPlacesRepository.findOne({ id });
    if (!found) throw new NotFoundException(`FoodPlace with ID ${id} not found`);

    return found;
  }

  async deleteFoodPlace(id: string): Promise<void> {
    const result = await this.foodPlacesRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`FoodPlace with ID ${id} not found`);
    }
  }
}
