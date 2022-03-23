import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthzService } from '../authz/authz.service';
import { FoodPlacesService } from '../food-places/food-places.service';
import { FoodPlacesRepository } from '../food-places/food-places.repository';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { UserPreferencesRepository } from '../user-preferences/user-preferences.repository';
import { UserAddressService } from '../user-address/user-addresses.service';
import { UserAddressesRepository } from '../user-address/user-addresses.repository';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [JwtModule.register({}), HttpModule, TypeOrmModule.forFeature([
    UserPreferencesRepository, UserAddressesRepository, FoodPlacesRepository,
  ])],
  controllers: [UsersController],
  providers: [AuthzService, UsersService, UserPreferencesService, UserAddressService, FoodPlacesService],
})
export class UsersModule {}
