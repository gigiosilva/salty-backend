import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodPlacesRepository } from '../food-places/food-places.repository';
import { FoodPlacesService } from '../food-places/food-places.service';

import { UserAddressService } from './user-addresses.service';
import { UserAddressController } from './user-addresses.controller';
import { UserAddressesRepository } from './user-addresses.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddressesRepository]),
    TypeOrmModule.forFeature([FoodPlacesRepository]),
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService, FoodPlacesService],
})
export class UserAddressModule {}
