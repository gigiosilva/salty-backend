import {
  Body, Controller, Delete, Get, Logger, Param, Post, Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateFoodPlaceDto } from './dto/create-food-place.dto';
import { GetFoodPlacesFilterDto } from './dto/get-food-places-filter.dto';
import { FoodPlace } from './food-place.entity';
import { FoodPlacesService } from './food-places.service';

@ApiTags('Food places')
@Controller('food-places')
export class FoodPlacesController {
  private logger = new Logger('FoodPlacesController', { timestamp: true });

  constructor(private foodPlacesService: FoodPlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Get food places' })
  getFoodPlaces(
    @Query() filterDto: GetFoodPlacesFilterDto,
  ): Promise<FoodPlace[]> {
    this.logger.verbose(
      `Retrieving all food places. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );

    return this.foodPlacesService.getFoodPlaces(filterDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get food by id' })
  getFoodPlaceById(@Param('id') id: string): Promise<FoodPlace> {
    return this.foodPlacesService.getFoodPlaceById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create food place' })
  createFoodPlace(
    @Body() createFoodPlaceDto: CreateFoodPlaceDto,
  ): Promise<FoodPlace> {
    this.logger.verbose(
      `New food place created. Data: ${JSON.stringify(createFoodPlaceDto)}`,
    );

    return this.foodPlacesService.createFoodPlace(createFoodPlaceDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete food place' })
  deleteFoodPlace(@Param('id') id: string): Promise<void> {
    return this.foodPlacesService.deleteFoodPlace(id);
  }
}
