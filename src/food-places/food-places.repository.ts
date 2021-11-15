import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateFoodPlaceDto } from './dto/create-food-place.dto';
import { GetFoodPlacesFilterDto } from './dto/get-food-places-filter.dto';
import { FoodPlace } from './food-place.entity';

@EntityRepository(FoodPlace)
export class FoodPlacesRepository extends Repository<FoodPlace> {
  private logger = new Logger('FoodPlacesRepository', { timestamp: true });

  async getFoodPlaces(filterDto: GetFoodPlacesFilterDto): Promise<FoodPlace[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('foodPlace');

    if (search) {
      query.andWhere(
        '(LOWER(foodPlace.name) LIKE LOWER(:search) OR LOWER(foodPlace.website) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const foodPlaces = await query.getMany();

      return foodPlaces;
    } catch (error) {
      this.logger.error(
        `Failed to get foodPlaces. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createFoodPlace(
    createFoodPlaceDto: CreateFoodPlaceDto,
  ): Promise<FoodPlace> {
    const foodPlace = this.create(createFoodPlaceDto);

    try {
      await this.save(foodPlace);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException('Food place name already exists');
      }

      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

    return foodPlace;
  }
}
